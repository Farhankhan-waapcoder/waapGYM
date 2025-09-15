// Mock data for the GymSaaS platform

export const mockUsers = {
  admin: {
    id: 1,
    name: "Admin User",
    email: "admin@gymsaas.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  gym_owner: {
    id: 2,
    name: "John Smith",
    email: "john@fitnesscenter.com",
    role: "gym_owner",
    gym: "FitnessCenter Pro",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
  },
  trainer: {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah@fitnesscenter.com",
    role: "trainer",
    gym: "FitnessCenter Pro",
    specialization: "Strength Training",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150&h=150&fit=crop&crop=face"
  },
  member: {
    id: 4,
    name: "Mike Davis",
    email: "mike@email.com",
    role: "member",
    gym: "FitnessCenter Pro",
    membershipType: "Premium",
    joinDate: "2024-01-15",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }
};

export const mockGyms = [
  {
    id: 1,
    name: "FitnessCenter Pro",
    owner: "John Smith",
    location: "New York, NY",
    members: 245,
    trainers: 8,
    revenue: 45200,
    status: "active",
    plan: "Professional",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Iron Temple",
    owner: "Lisa Chen",
    location: "Los Angeles, CA",
    members: 189,
    trainers: 5,
    revenue: 32800,
    status: "active",
    plan: "Starter",
    logo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "PowerHouse Gym",
    owner: "Robert Wilson",
    location: "Chicago, IL",
    members: 456,
    trainers: 12,
    revenue: 78900,
    status: "active",
    plan: "Enterprise",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop"
  }
];

export const mockMembers = [
  {
    id: 1,
    name: "Mike Davis",
    email: "mike@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2024-01-15",
    membershipType: "Premium",
    status: "active",
    trainer: "Sarah Johnson",
    workoutStreak: 12,
    totalWorkouts: 45,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    email: "emily@email.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2024-02-20",
    membershipType: "Basic",
    status: "active",
    trainer: "Sarah Johnson",
    workoutStreak: 8,
    totalWorkouts: 32,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Alex Thompson",
    email: "alex@email.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2024-03-10",
    membershipType: "Premium",
    status: "active",
    trainer: "Mark Wilson",
    workoutStreak: 15,
    totalWorkouts: 52,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

export const mockTrainers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@fitnesscenter.com",
    phone: "+1 (555) 987-6543",
    specialization: "Strength Training",
    experience: "5 years",
    members: 15,
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Mark Wilson",
    email: "mark@fitnesscenter.com",
    phone: "+1 (555) 876-5432",
    specialization: "Cardio & HIIT",
    experience: "3 years",
    members: 12,
    rating: 4.6,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
  }
];

export const mockWorkouts = [
  {
    id: 1,
    name: "Upper Body Strength",
    trainer: "Sarah Johnson",
    assignedTo: ["Mike Davis", "Emily Rodriguez"],
    duration: 45,
    exercises: [
      { name: "Push-ups", sets: 3, reps: 12, weight: "bodyweight" },
      { name: "Bench Press", sets: 4, reps: 8, weight: "135 lbs" },
      { name: "Pull-ups", sets: 3, reps: 8, weight: "bodyweight" },
      { name: "Shoulder Press", sets: 3, reps: 10, weight: "95 lbs" }
    ],
    createdDate: "2024-01-10"
  },
  {
    id: 2,
    name: "HIIT Cardio Blast",
    trainer: "Mark Wilson",
    assignedTo: ["Alex Thompson"],
    duration: 30,
    exercises: [
      { name: "Burpees", sets: 4, reps: 10, weight: "bodyweight" },
      { name: "Mountain Climbers", sets: 4, reps: 20, weight: "bodyweight" },
      { name: "Jump Squats", sets: 4, reps: 15, weight: "bodyweight" },
      { name: "High Knees", sets: 4, reps: 30, weight: "bodyweight" }
    ],
    createdDate: "2024-01-12"
  }
];

export const mockDietPlans = [
  {
    id: 1,
    name: "Muscle Building Diet",
    trainer: "Sarah Johnson",
    assignedTo: ["Mike Davis"],
    calories: 2800,
    protein: 140,
    carbs: 350,
    fat: 93,
    meals: [
      {
        name: "Breakfast",
        calories: 650,
        foods: ["Oatmeal with banana", "Greek yogurt", "Almonds"]
      },
      {
        name: "Lunch",
        calories: 750,
        foods: ["Grilled chicken breast", "Brown rice", "Steamed vegetables"]
      },
      {
        name: "Dinner",
        calories: 700,
        foods: ["Salmon fillet", "Sweet potato", "Green salad"]
      },
      {
        name: "Snacks",
        calories: 700,
        foods: ["Protein shake", "Apple with peanut butter", "Mixed nuts"]
      }
    ],
    createdDate: "2024-01-15"
  }
];

export const mockCompetitions = [
  {
    id: 1,
    name: "30-Day Fitness Challenge",
    description: "Complete 30 workouts in 30 days",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "completed",
    participants: 45,
    prize: "$500 Gift Card",
    rules: "Must complete at least 30 workouts during the challenge period"
  },
  {
    id: 2,
    name: "Weight Loss Competition",
    description: "Healthy weight loss challenge",
    startDate: "2024-02-01",
    endDate: "2024-03-31",
    status: "active",
    participants: 32,
    prize: "Free 3-month membership",
    rules: "Participants must lose weight in a healthy manner with trainer supervision"
  },
  {
    id: 3,
    name: "Summer Shred Challenge",
    description: "Get summer-ready with our intensive program",
    startDate: "2024-05-01",
    endDate: "2024-06-30",
    status: "upcoming",
    participants: 0,
    prize: "$1000 Cash Prize",
    rules: "Follow assigned workout and diet plan, track progress weekly"
  }
];

export const mockLeaderboard = [
  {
    id: 3,
    rank: 1,
    name: "Alex Thompson",
    score: 95,
    workouts: 28,
    streak: 15,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 1,
    rank: 2,
    name: "Mike Davis",
    score: 88,
    workouts: 25,
    streak: 12,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    rank: 3,
    name: "Emily Rodriguez",
    score: 82,
    workouts: 22,
    streak: 8,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    rank: 4,
    name: "Jessica Lee",
    score: 78,
    workouts: 20,
    streak: 10,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    rank: 5,
    name: "David Chen",
    score: 75,
    workouts: 19,
    streak: 6,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
  }
];

export const mockPayments = [
  {
    id: 1,
    member: "Mike Davis",
    amount: 99,
    date: "2024-01-15",
    status: "paid",
    plan: "Premium Monthly",
    method: "Credit Card"
  },
  {
    id: 2,
    member: "Emily Rodriguez",
    amount: 49,
    date: "2024-01-20",
    status: "paid",
    plan: "Basic Monthly",
    method: "Bank Transfer"
  },
  {
    id: 3,
    member: "Alex Thompson",
    amount: 99,
    date: "2024-02-10",
    status: "pending",
    plan: "Premium Monthly",
    method: "Credit Card"
  }
];

export const mockAnalytics = {
  totalRevenue: 125900,
  totalGyms: 3,
  totalMembers: 890,
  activeSubscriptions: 3,
  monthlyGrowth: 12.5,
  revenueByMonth: [
    { month: 'Jan', revenue: 98500 },
    { month: 'Feb', revenue: 105200 },
    { month: 'Mar', revenue: 112800 },
    { month: 'Apr', revenue: 125900 },
  ],
  gymPerformance: [
    { name: 'PowerHouse Gym', members: 456, revenue: 78900, growth: 15.2 },
    { name: 'FitnessCenter Pro', members: 245, revenue: 45200, growth: 8.7 },
    { name: 'Iron Temple', members: 189, revenue: 32800, growth: 22.1 },
  ]
};

export const mockNotifications = [
  {
    id: 1,
    title: "New Competition Starting",
    message: "Summer Shred Challenge begins next week",
    time: "2 hours ago",
    type: "competition",
    read: false
  },
  {
    id: 2,
    title: "Payment Reminder",
    message: "Your membership payment is due tomorrow",
    time: "1 day ago",
    type: "payment",
    read: false
  },
  {
    id: 3,
    title: "New Workout Assigned",
    message: "Sarah Johnson assigned you a new workout plan",
    time: "3 days ago",
    type: "workout",
    read: true
  }
];

// Generate realistic workout activity data for the last year
const generateActivityData = () => {
  const data = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setDate(today.getDate() - 364);

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    
    // Higher activity on weekdays, lower on weekends
    const baseChance = dayOfWeek === 0 || dayOfWeek === 6 ? 0.3 : 0.7;
    
    // Seasonal variation - higher activity in January (New Year) and summer months
    const month = d.getMonth();
    let seasonalMultiplier = 1;
    if (month === 0) seasonalMultiplier = 1.4; // January
    if (month >= 4 && month <= 7) seasonalMultiplier = 1.2; // May-August
    if (month === 11) seasonalMultiplier = 0.8; // December
    
    const chance = baseChance * seasonalMultiplier;
    
    // Simulate workout streaks and occasional rest days
    const random = Math.random();
    let count = 0;
    
    if (random < chance * 0.8) count = 1;
    if (random < chance * 0.3) count = 2;
    if (random < chance * 0.1) count = 3;
    if (random < chance * 0.05) count = 4;
    
    if (count > 0) {
      data.push({ date: dateStr, count });
    }
  }
  
  return data;
};

export const mockActivityData = generateActivityData();