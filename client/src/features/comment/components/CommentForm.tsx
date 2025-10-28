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
import { File, MapPin, Mic, Smile } from 'lucide-react'

const formSchema = z.object({
  message: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})
const CommentForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Waiting for your reply"
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
                <button className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full">
                  <File size={18} />
                </button>
                <button className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full">
                  <Smile size={18} />
                </button>
                <button className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full">
                  <Mic size={18} />
                </button>
                <button className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full">
                  <MapPin size={18} />
                </button>
                <button className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full">
                  <MapPin size={18} />
                </button>
              </div>
              <Button variant={'secondary'} size={'sm'} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CommentForm
