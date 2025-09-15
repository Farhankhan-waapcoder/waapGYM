import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Check, Dumbbell, Users, Trophy, BarChart3, Menu, X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Reveal } from "../shared/Reveal";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Member Management",
      description: "Easily manage all your gym members, track their progress, and handle memberships."
    },
    {
      icon: Dumbbell,
      title: "Workout Plans",
      description: "Create and assign personalized workout plans to your members with trainer guidance."
    },
    {
      icon: Trophy,
      title: "Competitions & Leaderboards",
      description: "Engage members with competitions and track their achievements on leaderboards."
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Get detailed analytics on gym performance, member engagement, and revenue."
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for small gyms",
      features: [
        "Up to 100 members",
        "2 trainers included",
        "Basic workout plans",
        "Member app access",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      description: "Best for growing gyms",
      features: [
        "Up to 500 members",
        "10 trainers included",
        "Advanced workout plans",
        "Diet plan management",
        "Competitions & leaderboards",
        "Priority support",
        "Analytics dashboard"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      description: "For large gym chains",
      features: [
        "Unlimited members",
        "Unlimited trainers",
        "Custom integrations",
        "White-label app",
        "Advanced analytics",
        "24/7 phone support",
        "Custom features"
      ],
      popular: false
    }
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileNavOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b px-4 sm:px-6 py-4 sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">GymSaaS</span>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" onClick={() => scrollTo('features')}>Features</Button>
            <Button variant="ghost" onClick={() => scrollTo('pricing')}>Pricing</Button>
            <Button variant="ghost" onClick={() => scrollTo('about')}>About</Button>
            <Button onClick={onGetStarted}>Get Started</Button>
          </div>
          {/* Mobile toggle */}
          <button
            aria-label="Toggle navigation"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMobileNavOpen(o => !o)}
          >
            {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {/* Mobile panel */}
        {mobileNavOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-2 animate-in slide-in-from-top">
            <Button variant="ghost" className="justify-start" onClick={() => scrollTo('features')}>Features</Button>
            <Button variant="ghost" className="justify-start" onClick={() => scrollTo('pricing')}>Pricing</Button>
            <Button variant="ghost" className="justify-start" onClick={() => scrollTo('about')}>About</Button>
            <Button className="justify-start" onClick={onGetStarted}>Get Started</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20" id="hero">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal className="space-y-8" animateClassName="animate-fade-up">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit text-xs sm:text-sm">
                  Complete Gym Management Solution
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
                  Manage Your Gym Like a <span className="text-primary">Pro</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Complete SaaS platform for gym owners, trainers, and members. Manage memberships, create workout plans, track progress, and engage members with competitions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="lg" onClick={onGetStarted} className="text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto">
                  Watch Demo
                </Button>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </Reveal>
            <div className="relative">
              <Reveal animateClassName="animate-scale-in">
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl sm:shadow-2xl ring-1 ring-border/50 hover-scale-sm">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1576491742123-735882d4ca7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjBmaXRuZXNzJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NzY3MDU4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Modern gym with fitness equipment"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-muted/30" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Everything You Need to Run Your Gym
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From member management to workout planning, we've got all the tools you need
            </p>
          </div>
          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 stagger" animateClassName="">
            {features.map((feature, index) => (
              <div data-animate-child key={index}>
                <Card className="text-center hover-card hover-tint">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20" id="pricing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Choose the plan that's right for your gym
            </p>
          </div>
          {/* On very small screens allow horizontal scroll instead of huge vertical stack spacing */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-6 lg:gap-8 md:[&>*]:h-full overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-2 -mx-4 px-4">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative snap-center min-w-[85%] xs:min-w-[70%] sm:min-w-0 hover-card hover-scale-sm ${plan.popular ? 'border-primary shadow-lg pt-8' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute top-2 left-1/2 -translate-x-1/2 z-10 shadow-sm">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary">
                    {plan.price}
                    <span className="text-lg text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={onGetStarted}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-primary text-primary-foreground" id="about">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Ready to Transform Your Gym?
          </h2>
          <p className="text-base sm:text-lg md:text-xl opacity-90">
            Join thousands of gym owners who trust GymSaaS to manage their business
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={onGetStarted} className="text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto hover-scale-sm">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto hover-scale-sm">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">GymSaaS</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 GymSaaS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}