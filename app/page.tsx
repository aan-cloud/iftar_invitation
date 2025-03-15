"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, MapPinIcon, SendIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { List } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  message: z.string().optional(),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
})

export default function Home() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
      address: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attend`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          address: values.address,
          message: values.message
        })
      });
  
      router.push("/confirmation?name=" + encodeURIComponent(values.name))
      setIsSubmitting(false)
    } catch (error) {
      console.log(error)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center p-4">
      <motion.div className="w-full max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-bold text-amber-800 dark:text-amber-400 mb-2">Undangan Buka Bersama</h1>
          <p className="text-lg md:text-xl text-amber-700 dark:text-amber-300">
          Bergabunglah bersama kami untuk berbuka puasa bersama alumni Bahrul Ulum dalam suasana penuh berkah
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <span>Detail Acara</span>
                </CardTitle>
                <CardDescription>Informasi mengenai acara Iftar kami</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                    <CalendarIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Tanggal & Waktu</h3>
                    <p className="text-sm text-muted-foreground">Minggu, 24 Maret, 2025 (7:30 PM)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                    <MapPinIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">Restoran Galaherang, Mempawah</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm italic">
                    "Wahai orang-orang yang beriman, diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang-orang sebelum kamu agar kamu bertakwa." - QS. Al-Baqarah 2:183
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <span>Pendaftaran Kehadiran</span>
                </CardTitle>
                <CardDescription>Silakan beri tahu kami jika Anda dapat bergabung</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama</FormLabel>
                          <FormControl>
                            <Input placeholder="Nama lengkap kamu" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alamat</FormLabel>
                          <FormControl>
                            <Input placeholder="Alamat tempat tinggal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pesan (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Sebutkan jika ada pantangan makanan atau pesan ke Admin"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Beri tahu kami jika Anda memiliki kebutuhan khusus</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Mendaftar...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <SendIcon className="h-4 w-4" />
                          Daftar
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div className="text-center mt-8 text-amber-700 dark:text-amber-300 text-sm" variants={itemVariants}>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <List />
            <Link href={"/confirmation"}>Lihat daftar kehadiran </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

