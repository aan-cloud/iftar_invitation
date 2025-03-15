"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2Icon, HomeIcon, Users2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

type Attendee = {
  id: string,
  name: string;
  address: string;
  message: string;
};

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const [allAttendees, setAllAttendees] = useState<Attendee[]>([]);
  const name = searchParams.get("name") || "Guest"

  // Add the new attendee to the list (in a real app, this would be handled by a database)
  useEffect(() => {
    async function getAllAttendees () {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attend`);

        if (!response) {
          throw new Error("Failed to fetch data")
        }

        const result = await response.json();

        setAllAttendees(result)
      } catch (error) {
        console.error(error)
      }
    }

    getAllAttendees();
  })

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

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-800 p-4 py-8">
      <motion.div className="w-full max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200 dark:border-amber-800 mb-8">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5,
                  }}
                >
                  <CheckCircle2Icon className="h-16 w-16 text-green-500" />
                </motion.div>
              </div>
              <CardTitle className="text-center text-2xl">Terima Kasih, {name}!</CardTitle>
              <CardDescription className="text-center">
                Pendaftaran mu untuk buka bersama telah kami terima
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">Kami menunggu kehadiranmu di hari Senin, 24 Maret 2025 - 6:00 PM.</p>
              <p className="text-sm text-muted-foreground">
                Email konfirmasi beserta detailnya telah kami kirimkan ke email mu.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600">
                <Link href="/">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Kembali ke Halaman Utama
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Users2Icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-400">Daftar Kehadiran ({allAttendees.length})</h2>
          </div>
          <p className="text-amber-700 dark:text-amber-300 mb-4">
            Daftar alumni yang akan hadir pada acara buka bersama:
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={containerVariants}>
          {allAttendees.map((attendee, index) => (
            <motion.div key={attendee.id} variants={itemVariants} custom={index} transition={{ delay: index * 0.1 }}>
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200 dark:border-amber-800 h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border-2 border-amber-200 dark:border-amber-700">
                      <AvatarImage src={"/placeholder.svg?height=40&width=40"} alt={attendee.name} />
                      <AvatarFallback className="bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100">
                        {getInitials(attendee.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{attendee.name}</CardTitle>
                      <CardDescription className="truncate max-w-[250px]">{attendee.address}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {attendee.message ? (
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md text-sm italic">
                      "{attendee.message}"
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground italic">No message provided</div>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  {attendee.name === name && (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-700"
                    >
                      You
                    </Badge>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

