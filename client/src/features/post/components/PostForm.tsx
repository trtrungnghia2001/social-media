import { IMAGE_NOTFOUND } from '@/shared/constants/image.constant'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form'
import { Textarea } from '@/shared/components/ui/textarea'
import {
  File,
  Loader,
  MapPin,
  Mic,
  Paperclip,
  Smile,
  Trash,
} from 'lucide-react'
import { memo, useEffect, useRef, useState } from 'react'
import { usePostStore } from '../stores/post.store'
import { useMutation } from '@tanstack/react-query'
import type { IPostDTO } from '../types/post.type'
import { toast } from 'sonner'

const formSchema = z.object({
  content: z.string(),
})
const PostForm = () => {
  // store
  const { create } = usePostStore()
  const { isPending, mutate } = useMutation({
    mutationFn: async (data: IPostDTO) => {
      const formData = new FormData()
      if (data.content) formData.append('content', data.content)
      if (data.file) formData.append('file', data.file)

      return await create(formData)
    },
    onSuccess: () => {
      toast.success('Post created successfully')
      form.reset()
      setFile(null)
    },
    onError: (error) => toast.error('Error creating post:: ' + error.message),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.content && !file) return
    mutate({ content: values.content, file: file ?? undefined })
  }

  // file
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const handleFileClick = () => {
    inputFileRef.current?.click()
  }
  const [previewFile, setPreviewFile] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewFile(url)
      return () => {
        URL.revokeObjectURL(url)
      }
    } else {
      setPreviewFile(null)
    }
  }, [file])

  return (
    <div className="flex items-start gap-2 p-4">
      <div className="w-8 aspect-square overflow-hidden rounded-full">
        <img
          src={IMAGE_NOTFOUND.avatar_notfound}
          alt="avatar"
          className="img"
        />
      </div>
      <div className="flex-1">
        {/* form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="What is going on?"
                      {...field}
                      className="border-none outline-none shadow-none w-full bg-gray-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputFileRef}
                  onChange={(e) => setFile(e.target.files?.[0] as File)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleFileClick}
                  className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full"
                >
                  <File size={18} />
                </button>
                <button
                  type="button"
                  className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full"
                >
                  <Smile size={18} />
                </button>
                <button
                  type="button"
                  className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full"
                >
                  <Mic size={18} />
                </button>
                <button
                  type="button"
                  className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full"
                >
                  <MapPin size={18} />
                </button>
                <button
                  type="button"
                  className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full"
                >
                  <Paperclip size={18} />
                </button>
              </div>
              <Button
                disabled={isPending}
                variant={'secondary'}
                size={'sm'}
                type="submit"
              >
                {isPending && <Loader className="animate-spin" />}
                Submit
              </Button>
            </div>
            {/* preview */}
            {previewFile && (
              <div className="border-t pt-4">
                <div className="w-52 h-auto overflow-hidden rounded cursor-pointer relative group">
                  <img src={previewFile} alt="file" className="img" />
                  <div className="hidden absolute inset-0 bg-black/70 text-white group-hover:flex items-center justify-center">
                    <button type="button" onClick={() => setFile(null)}>
                      <Trash />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}

export default memo(PostForm)
