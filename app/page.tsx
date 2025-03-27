import Link from "next/link"
import { ArrowRight, CheckCircle2, HeartPulse, LineChart, ShieldCheck } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:gap-12">
              <div className="lg:w-1/2">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Personalized Diabetes Care for Kenyans
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  DiabetesCare Kenya harnesses real-time data, predictive analytics, and AI-driven insights to provide
                  personalized diabetes management for better health outcomes.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/signup">
                    <Button size="lg" className="gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-12 lg:mt-0 lg:w-1/2">
                <Image
                  src="/image.png"
                  width={900}
                  height={900}
                  alt="This is just an image on representing kenyans"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Comprehensive Diabetes Management</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our platform offers everything you need to effectively manage diabetes.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <LineChart className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">Real-time Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Track your glucose levels in real-time and visualize trends to better understand your health
                    patterns.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <HeartPulse className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">Personalized Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Receive personalized recommendations based on your unique health data and lifestyle.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <ShieldCheck className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">Predictive Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    AI-powered risk assessment helps you stay ahead of potential health issues before they become
                    serious.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by Patients Across Kenya</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Hear from people who have improved their diabetes management with our platform.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground italic">
                      "DiabetesCare Kenya has transformed how I manage my condition. The personalized insights and AI
                      companion have helped me maintain stable glucose levels."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold">JM</span>
                      </div>
                      <div>
                        <p className="font-medium">Jane Muthoni</p>
                        <p className="text-sm text-muted-foreground">Nairobi</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground italic">
                      "As a doctor, I recommend DiabetesCare Kenya to all my patients with diabetes. The data insights
                      help me provide better care and make informed treatment decisions."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold">DO</span>
                      </div>
                      <div>
                        <p className="font-medium">Dr. David Omondi</p>
                        <p className="text-sm text-muted-foreground">Kisumu</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground italic">
                      "The predictive alerts have saved me from several hypoglycemic episodes. This platform understands
                      the unique challenges of managing diabetes in Kenya."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold">PK</span>
                      </div>
                      <div>
                        <p className="font-medium">Peter Kimani</p>
                        <p className="text-sm text-muted-foreground">Mombasa</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Take Control of Your Diabetes Today</h2>
              <p className="mt-4 text-lg opacity-90">
                Join thousands of Kenyans who are managing their diabetes more effectively with DiabetesCare Kenya.
              </p>
              <div className="mt-10">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Sign Up for Free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose DiabetesCare Kenya</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our platform is specifically designed for the Kenyan healthcare context.
              </p>
            </div>
            <div className="mt-16 grid gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium">Locally Relevant</h3>
                  <p className="mt-2 text-muted-foreground">
                    Tailored to Kenyan dietary patterns, healthcare resources, and lifestyle factors.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium">Works Offline</h3>
                  <p className="mt-2 text-muted-foreground">
                    Core features available offline, perfect for areas with limited connectivity.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium">Healthcare Integration</h3>
                  <p className="mt-2 text-muted-foreground">
                    Connects with local healthcare providers for seamless care coordination.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium">AI Health Companion</h3>
                  <p className="mt-2 text-muted-foreground">
                    24/7 support and guidance from our AI assistant trained on Kenyan healthcare protocols.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium">Data Security</h3>
                  <p className="mt-2 text-muted-foreground">
                    Your health data is encrypted and protected with enterprise-grade security.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium">Affordable Access</h3>
                  <p className="mt-2 text-muted-foreground">
                    Flexible pricing plans designed to be accessible for all Kenyans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

