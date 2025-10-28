import { memo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import StoryCard from './StoryCard'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'

const stories = [
  {
    _id: '1',
    fileUrl: 'https://pbs.twimg.com/media/G0noMA9acAASOCG?format=jpg',
    type: 'image',
  },
  {
    _id: '2',
    fileUrl: 'https://pbs.twimg.com/media/Gx6pJZga0AA-dBD?format=jpg',
    type: 'image',
  },
  {
    _id: '3',
    fileUrl: 'https://pbs.twimg.com/media/Gwjj5evWQAAgdi-?format=jpg',
    type: 'image',
  },
  {
    _id: '4',
    fileUrl: 'https://pbs.twimg.com/media/GvotuVmWAAAHV8-?format=jpg',
    type: 'image',
  },
  {
    _id: '5',
    fileUrl:
      'https://pbs.twimg.com/media/GqZ6blLWkAAFtHG?format=jpg&name=small',
    type: 'image',
  },
  {
    _id: '6',
    fileUrl:
      'https://pbs.twimg.com/media/GrUiyUCWIAAw6bO?format=jpg&name=360x360',
    type: 'image',
  },
  {
    _id: '7',
    fileUrl:
      'https://pbs.twimg.com/media/GtlQhXPX0AAEI7t?format=jpg&name=360x360',
    type: 'image',
  },
]

const StorySide = () => {
  const [open, setOpen] = useState(false)
  const [indexStoy, setIndexStory] = useState(0)
  return (
    <>
      {/* side */}
      <div className="p-4 border-b">
        <Swiper
          spaceBetween={8}
          slidesPerView={3}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {stories.map((item, idx) => (
            <SwiperSlide
              key={item._id}
              onClick={() => {
                setOpen(!open)
                setIndexStory(idx)
              }}
            >
              <StoryCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* model */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[95vh]">
          <DialogHeader>
            <DialogTitle>Story preview</DialogTitle>
            <DialogDescription>
              <div className="h-full w-auto">
                <img
                  src={stories[indexStoy].fileUrl}
                  alt="img"
                  className="img"
                />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default memo(StorySide)
