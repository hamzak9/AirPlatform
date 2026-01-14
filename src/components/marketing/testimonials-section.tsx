'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Worksy Ops transformed how we manage our 47 properties. Tasks are automated, our team is coordinated, and guests are happier than ever.',
    author: 'Sarah Johnson',
    role: 'CEO, Coastal Stays Management',
    rating: 5,
  },
  {
    quote:
      "The scheduling automation alone saves us 10+ hours per week. It's like having an extra employee dedicated to logistics.",
    author: 'Michael Chen',
    role: 'Operations Director, Urban Retreats',
    rating: 5,
  },
  {
    quote:
      'We tried 4 different platforms before finding Worksy Ops. The mobile app for our cleaning team is a game-changer.',
    author: 'Emily Rodriguez',
    role: 'Founder, Elite Vacation Rentals',
    rating: 5,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            Trusted by property managers worldwide
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            See what our customers have to say about transforming their operations
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  {/* Stars */}
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="mb-6 text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {testimonial.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Join 1,000+ property managers who trust Worksy Ops
          </p>
        </div>
      </div>
    </section>
  )
}
