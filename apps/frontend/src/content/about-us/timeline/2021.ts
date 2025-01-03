// content/about-us/timeline/2021.ts
import type { TimelineSection } from './types'

export const timeline2021: TimelineSection = {
  id: '2021',
  year: '2021/22',
  title: 'Budowa Flightcore',
  content: `
      <p>
        <span class="font-bold">Naturalną konsekwencją</span> coraz większego zapotrzebowania na nagrywki we F-Lighcie stał się pomysł przeniesienia lokalizacji w <span class="font-bold">obszerniejsze miejsce</span>. Poszukiwania lokalu nie były proste - potrzebne było miejsce, do którego dostęp byłby możliwy przez 24 godziny oraz 7 dni w tygodniu, z wysokim sufitem oraz w sąsiedztwie, gdzie hałas nie przeszkadzałby mieszkańcom pobliskich budynków. Po <span class="font-bold">wielu miesiącach poszukiwań</span>, los zechciał aby Gerard oraz Dister przenieśli firmę tuż na przeciwko swojej uczelni, czyli vis a vis <span class="font-bold">Warszawskiej Szkoły Filmowej</span>.
      </p>
      <p>
        Przed Gerardem oraz Samiryiem było zadanie, aby zaprojektować oraz zbudować autentyczne, profesjonalne studio nagrań z prawdziwego zdarzenia. Tym razem celem nie była sama adaptacja akustyczna pomieszczeń - zgodnie ze sztuką, wszystkie pokoje studyjne zostały <span class="font-bold">zbudowane od zera</span>. Proces budowy trwał ponad rok, a po drodze trzeba było pokonać wiele przeciwności losu. Trzy powodzie, kryzys na rynku budowlanym oraz codzienna praca z wełną skalną, której na potrzeby stworzenia studia użyto ponad 8 ton.
      </p>
      <p>
        <span class="font-bold">Szczęśliwie</span>, po kilkunastu miesiącach budowy, można było ogłosić start pierwszej wersji strony internetowej wraz z platformą bookingową - po praktycznie roku nieobecności na mapie, <span class="font-bold">ekipa wróciła do biznesu muzycznego</span>.
      </p>
    `,
  images: [
    {
      src: 'assets/images/studio/studio-1/1.jpg',
      alt: 'Studio',
      className: 'left-[40px]',
    },
    {
      src: 'assets/images/studio/studio-1/2.jpg',
      alt: 'Studio',
      className: 'top-[200px]',
    },
  ],
}
