// content/about-us/timeline/index.ts
import { timeline2017 } from './2017'
import { timeline2018 } from './2018'
import { timeline2021 } from './2021'
import { timeline2022 } from './2022'
import type { TimelineSection } from './types'

export { timeline2017, timeline2018, timeline2021, timeline2022 }

export const timelineData: TimelineSection[] = [timeline2017, timeline2018, timeline2021, timeline2022]
