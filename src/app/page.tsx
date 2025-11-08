import Link from 'next/link';
import {
  Music,
  Users,
  Calendar,
  TrendingUp,
  MessageCircle,
  Shield,
  Sparkles,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppRoute } from '@/types/appRoutes';

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-400 opacity-20 blur-3xl" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-purple-400 opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-pink-400 opacity-20 blur-3xl" />
      </div>

      <nav className="relative z-10 border-b border-white/20 bg-white/40 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
              <Music className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
              Sonata
            </span>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-white/50">
                  Sign In
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-50 w-56 border-2 border-white/60 bg-white/95 backdrop-blur-lg">
                <DropdownMenuItem className="p-0 focus:bg-blue-50">
                  <Link
                    href={AppRoute.SignInTeacher}
                    className="flex w-full items-center gap-2 px-2 py-3"
                  >
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">I&apos;m a Teacher</p>
                      <p className="text-xs text-muted-foreground">Manage lessons &amp; students</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 focus:bg-purple-50">
                  <Link
                    href="/signin?type=student"
                    className="flex w-full items-center gap-2 px-2 py-3"
                  >
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">I&apos;m a Student</p>
                      <p className="text-xs text-muted-foreground">Connect with my teacher</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-50 w-56 border-2 border-white/60 bg-white/95 backdrop-blur-lg">
                <DropdownMenuItem className="p-0 focus:bg-blue-50">
                  <Link
                    href={AppRoute.SignUpTeacher}
                    className="flex w-full items-center gap-2 px-2 py-3"
                  >
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">I&apos;m a Teacher</p>
                      <p className="text-xs text-muted-foreground">Manage lessons &amp; students</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 focus:bg-purple-50">
                  <Link
                    href="/signup?type=student"
                    className="flex w-full items-center gap-2 px-2 py-3"
                  >
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">I&apos;m a Student</p>
                      <p className="text-xs text-muted-foreground">Connect with my teacher</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/60 px-4 py-2 text-sm font-medium text-purple-700 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Built by teachers, for teachers
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-7xl lg:text-8xl">
            Your music teaching
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {' '}
              central hub
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600 md:text-2xl">
            The only platform you need to manage lessons, connect with students, and grow your teaching practice
          </p>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <Card className="group overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50 transition-all hover:scale-105 hover:border-blue-400 hover:shadow-2xl">
              <CardContent className="p-8">
                <Users className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                <h3 className="mb-3 text-2xl font-bold text-gray-900">For Teachers</h3>
                <p className="mb-6 text-gray-600">Run your entire lesson business from one powerful platform</p>
                <Button asChild className="w-full bg-blue-600 text-white hover:bg-blue-700" size="lg">
                  <Link href={AppRoute.SignUpTeacher}>
                    <span>Get Started</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/50 transition-all hover:scale-105 hover:border-purple-400 hover:shadow-2xl">
              <CardContent className="p-8">
                <Music className="mx-auto mb-4 h-12 w-12 text-purple-600" />
                <h3 className="mb-3 text-2xl font-bold text-gray-900">For Students</h3>
                <p className="mb-6 text-gray-600">Connect with your teacher and upgrade your music journey</p>
                <Button
                  asChild
                  className="w-full bg-purple-600 text-white hover:bg-purple-700"
                  size="lg"
                >
                  <Link href="/signup?type=student">
                    <span>Get Started</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Everything you need,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                nothing you don&apos;t
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Designed from the ground up to solve the real problems music teachers face every day
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 border-white/60 bg-white/60 backdrop-blur-sm transition-all hover:scale-105 hover:border-blue-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Smart Scheduling</h3>
                <p className="text-gray-600">Automated booking and reminders that work around your life</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-white/60 bg-white/60 backdrop-blur-sm transition-all hover:scale-105 hover:border-purple-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Direct Communication</h3>
                <p className="text-gray-600">Keep conversations organized in one secure place</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-white/60 bg-white/60 backdrop-blur-sm transition-all hover:scale-105 hover:border-pink-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 p-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Secure Payments</h3>
                <p className="text-gray-600">Get paid on time, every time, with automated invoicing</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-white/60 bg-white/60 backdrop-blur-sm transition-all hover:scale-105 hover:border-blue-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 p-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Progress Tracking</h3>
                <p className="text-gray-600">Visual reports that show student growth over time</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-white/60 bg-white/60 backdrop-blur-sm transition-all hover:scale-105 hover:border-purple-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Studio Scaling</h3>
                <p className="text-gray-600">Works perfectly whether you have 1 or 100 students</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-white/60 bg-white/60 backdrop-blur-sm transition-all hover:scale-105 hover:border-pink-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 p-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Always Improving</h3>
                <p className="text-gray-600">New features driven by real teacher feedback</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20">
        <div className="container mx-auto max-w-4xl">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1">
            <div className="rounded-2xl bg-white p-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">Ready to transform your teaching?</h2>
              <p className="mb-8 text-xl text-gray-600">Join hundreds of music teachers already using Sonata</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="min-w-[200px] bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href={AppRoute.SignUpTeacher}>Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  Watch Demo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/20 bg-white/40 px-6 py-12 backdrop-blur-lg">
        <div className="container mx-auto text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <Music className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              Sonata
            </span>
          </div>
          <p className="text-gray-600">For instructors, by instructors — Built with ❤️ for music teachers</p>
        </div>
      </footer>
    </div>
  );
}
