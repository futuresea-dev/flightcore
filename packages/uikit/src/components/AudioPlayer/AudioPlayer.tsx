import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

const noop = () => {
  /* intentionally empty */
}
export interface AudioPlayerProps {
  src: string
  title?: string
  artist?: string
  coverUrl?: string
  className?: string
  onPrevious?: () => void
  onNext?: () => void
  onShare?: () => void
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title = '',
  artist = '',
  coverUrl,
  className = '',
  onPrevious = noop,
  onNext = noop,
  onShare = noop,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlay = () => {
      setDuration(audio.duration)
    }

    audio.load() // Wymuszamy załadowanie
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('loadeddata', handleCanPlay)
    audio.addEventListener('loadedmetadata', handleCanPlay)

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleDurationChange = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('durationchange', handleDurationChange)

    // Cleanup
    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('loadeddata', handleCanPlay)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('durationchange', handleDurationChange)
    }
  }, [src])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    if (time < 0) time = 0
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formatRemainingTime = (current: number, total: number) => {
    // Dodajemy więcej logów do debugowania

    if (isNaN(total) || total <= 0 || isNaN(current)) {
      return '-0:00'
    }

    const remaining = Math.max(0, Math.floor(total - current))
    const minutes = Math.floor(remaining / 60)
    const seconds = remaining % 60

    const formattedTime = `-${minutes}:${seconds.toString().padStart(2, '0')}`
    return formattedTime
  }

  const PauseIcon = () => (
    <div className="flex gap-[6px]">
      <svg width="11" height="32" viewBox="0 0 11 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.47558 0H2.80841C1.28109 0 0.0429688 1.21785 0.0429688 2.72014V29.2799C0.0429688 30.7822 1.28109 32 2.80841 32H7.47558C9.0029 32 10.241 30.7822 10.241 29.2799V2.72014C10.241 1.21785 9.0029 0 7.47558 0Z"
          fill="currentColor"
        />
      </svg>
      <svg width="11" height="32" viewBox="0 0 11 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.19427 0H3.52716C1.99984 0 0.761719 1.21785 0.761719 2.72014V29.2799C0.761719 30.7822 1.99984 32 3.52716 32H8.19427C9.72159 32 10.9598 30.7822 10.9598 29.2799V2.72014C10.9598 1.21785 9.72159 0 8.19427 0Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )

  return (
    <div
      className={clsx(
        'w-[388px] md:w-[492px] h-[200px] rounded-lg p-6 relative bg-extra-dark',
        'border border-blue-medium',
        className,
      )}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration)
        }}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration)
        }}
        onDurationChange={(e) => {
          setDuration(e.currentTarget.duration)
        }}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {coverUrl && (
            <div className="absolute left-4 top-4 w-[68px] h-[68px] rounded-[4px] overflow-hidden bg-[#324760] shadow-[0px_0px_8px_rgba(0,0,0,0.16)]">
              <img src={coverUrl} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="absolute left-[98px] top-6">
            <h3 className="text-subtitle font-normal text-white leading-[32px] tracking-[0.25px]">{title}</h3>
            <p className="text-caption font-normal text-white leading-[20px] tracking-[0.4px] mt-0">{artist}</p>
          </div>
        </div>
        {/* Zmodyfikowana pozycja przycisku share */}
        <button onClick={onShare} className="absolute right-[16px] top-[38px] text-green hover:text-green-dark transition-colors">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.19525 20.144C2.96013 20.144 2.72995 20.04 2.57403 19.8396C0.891034 17.6665 0 15.0628 0 12.3131C0 5.52418 5.52418 0 12.3131 0C19.102 0 24.6262 5.52418 24.6262 12.3131C24.6262 15.0603 23.7352 17.664 22.0522 19.8371C21.7874 20.1786 21.2949 20.243 20.9508 19.9781C20.6093 19.7133 20.5449 19.2208 20.8122 18.8768C22.2824 16.9809 23.0571 14.7114 23.0571 12.3131C23.0571 6.38796 18.2357 1.56666 12.3106 1.56666C6.38548 1.56666 1.56421 6.38796 1.56421 12.3131C1.56421 14.7138 2.34138 16.9834 3.80905 18.8793C4.07387 19.2208 4.01198 19.7133 3.67043 19.9806C3.52688 20.092 3.3586 20.144 3.1903 20.144H3.19525Z"
              fill="currentColor"
            />
            <path
              d="M19.0552 17.5428C18.9067 17.5428 18.7557 17.5007 18.622 17.4116C18.2607 17.1716 18.1617 16.6865 18.4018 16.3251C19.1913 15.1346 19.6071 13.7462 19.6071 12.3132C19.6071 8.2913 16.3351 5.01936 12.3133 5.01936C8.29142 5.01936 5.01948 8.2913 5.01948 12.3132C5.01948 13.7462 5.43531 15.1322 6.22483 16.3226C6.46491 16.684 6.36588 17.1716 6.00453 17.4092C5.64318 17.6492 5.15811 17.5502 4.91803 17.1889C3.95773 15.741 3.45032 14.0556 3.45032 12.3132C3.45032 7.42505 7.42517 3.4502 12.3133 3.4502C17.2014 3.4502 21.1762 7.42505 21.1762 12.3132C21.1762 14.0556 20.6689 15.7435 19.7086 17.1914C19.5576 17.4191 19.3076 17.5428 19.0552 17.5428Z"
              fill="currentColor"
            />
            <path
              d="M16.5974 14.8525C16.4984 14.8525 16.3969 14.8327 16.2979 14.7931C15.8969 14.6273 15.7064 14.1694 15.8722 13.7685C16.0628 13.3081 16.1593 12.8206 16.1593 12.3132C16.1593 10.1946 14.4342 8.46953 12.3156 8.46953C10.197 8.46953 8.47194 10.1946 8.47194 12.3132C8.47194 12.8181 8.5685 13.3057 8.7566 13.7635C8.92242 14.1645 8.73186 14.6224 8.33091 14.7882C7.92996 14.954 7.47205 14.7634 7.30623 14.3625C7.03893 13.7116 6.90283 13.0235 6.90283 12.3132C6.90283 9.32836 9.33077 6.90039 12.3156 6.90039C15.3005 6.90039 17.7284 9.32836 17.7284 12.3132C17.7284 13.026 17.5923 13.7165 17.3225 14.3675C17.1988 14.6694 16.9067 14.8525 16.5974 14.8525Z"
              fill="currentColor"
            />
            <path
              d="M11.6897 13.7808L3.6484 22.5819C3.15093 23.1264 3.53703 24.0001 4.27211 24.0001H20.3546C21.0897 24.0001 21.4758 23.1264 20.9783 22.5819L12.9371 13.7808C12.6005 13.4145 12.0238 13.4145 11.6872 13.7808H11.6897Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-2 absolute left-4 right-4 top-[108px]">
        <div className="relative h-2 bg-[#324760] rounded-[8px]">
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-green-darker to-green"
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          />
          <input
            type="range"
            value={currentTime}
            min={0}
            max={duration || 100}
            step={0.1}
            onChange={handleProgressChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-caption font-normal text-white">{formatTime(currentTime)}</span>
          <span className="text-caption font-normal text-white text-right">{formatRemainingTime(currentTime, duration)}</span>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-[8%] flex items-center gap-8">
        <button onClick={onPrevious} className="text-green hover:text-green-dark transition-colors flex gap-0 h-[22px]">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.7229 1.23052L1.425 9.65819C0.396375 10.3114 0.398704 11.7914 1.43198 12.44L14.7299 20.7786C15.8467 21.4798 17.3119 20.6895 17.3119 19.3854V2.61915C17.3119 1.31275 15.8398 0.522509 14.7229 1.23052Z"
              fill="currentColor"
            />
          </svg>
          <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.0676 1.23052L0.769731 9.65819C-0.258898 10.3114 -0.25657 11.7914 0.776704 12.44L14.0746 20.7786C15.1915 21.4798 16.6566 20.6895 16.6566 19.3854V2.61915C16.6566 1.31275 15.1845 0.522509 14.0676 1.23052Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-green hover:text-green-dark transition-colors h-[32px] w-[32px] flex items-center justify-center">
          {isPlaying ? (
            <PauseIcon />
          ) : (
            <svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M25.7523 13.8574L4.19666 0.424024C2.38625 -0.704525 0 0.551447 0 2.63744V29.3622C0 31.4409 2.37127 32.7005 4.18545 31.5829L25.741 18.2915C27.4159 17.2613 27.4197 14.8986 25.7523 13.8574Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>

        <button onClick={onNext} className="text-green hover:text-green-dark transition-colors flex gap-0 h-[22px]">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.5744 9.65585L3.27647 1.22818C2.1596 0.520162 0.6875 1.30812 0.6875 2.6168V19.3831C0.6875 20.6872 2.15036 21.4774 3.26955 20.7763L16.5674 12.4377C17.6007 11.7913 17.603 10.309 16.5744 9.65585Z"
              fill="currentColor"
            />
          </svg>
          <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.2296 9.65585L2.9318 1.22818C1.81493 0.520162 0.342773 1.30812 0.342773 2.6168V19.3831C0.342773 20.6872 1.80796 21.4774 2.92482 20.7763L16.2227 12.4377C17.256 11.7913 17.2583 10.309 16.2296 9.65585Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
