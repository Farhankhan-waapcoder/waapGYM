import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface ActivityData {
  date: string;
  count: number;
}

interface ActivityHeatmapProps {
  data: ActivityData[];
  title?: string;
  className?: string;
}

export function ActivityHeatmap({ data, title = "Activity", className = "" }: ActivityHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<ActivityData | null>(null);

  // Generate a full year of data with the last 365 days
  const fullYearData = useMemo(() => {
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(today.getDate() - 364); // 364 to include today (365 total days)

    const dataMap = new Map(data.map(d => [d.date, d.count]));
    const fullData: ActivityData[] = [];

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      fullData.push({
        date: dateStr,
        count: dataMap.get(dateStr) || 0
      });
    }

    return fullData;
  }, [data]);

  // Group data by weeks (Sunday to Saturday)
  const weeklyData = useMemo(() => {
    const weeks: ActivityData[][] = [];
    let currentWeek: ActivityData[] = [];
    
    // Find the first Sunday
    const firstDate = new Date(fullYearData[0].date);
    const startOfWeek = new Date(firstDate);
    const dayOfWeek = startOfWeek.getDay();
    
    // Add empty cells for days before the first Sunday
    for (let i = 0; i < dayOfWeek; i++) {
      currentWeek.push({ date: '', count: 0 });
    }

    fullYearData.forEach((day, index) => {
      currentWeek.push(day);
      
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });

    // Fill the last week if needed
    while (currentWeek.length < 7 && currentWeek.length > 0) {
      currentWeek.push({ date: '', count: 0 });
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  }, [fullYearData]);

  // Get intensity level based on count
  const getIntensityLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 1) return 1;
    if (count <= 2) return 2;
    if (count <= 3) return 3;
    return 4;
  };

  // Get color class based on intensity
  const getColorClass = (level: number): string => {
    switch (level) {
      case 0:
        return 'bg-gray-100 dark:bg-gray-800';
      case 1:
        return 'bg-green-200 dark:bg-green-900';
      case 2:
        return 'bg-green-300 dark:bg-green-700';
      case 3:
        return 'bg-green-400 dark:bg-green-600';
      case 4:
        return 'bg-green-500 dark:bg-green-500';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  // Get month labels
  const monthLabels = useMemo(() => {
    const months: { name: string; offset: number }[] = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      // Calculate approximate week offset for this month
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const yearStart = new Date(fullYearData[0].date);
      const daysDiff = Math.floor((monthStart.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24));
      const weekOffset = Math.floor(daysDiff / 7);
      
      months.push({ name: monthName, offset: Math.max(0, weekOffset) });
    }
    
    return months;
  }, [fullYearData]);

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatTooltipDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getColorClass(level)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="inline-flex flex-col gap-1 min-w-max">
            {/* Month labels */}
            <div className="flex items-end h-4 ml-8">
              {monthLabels.map((month, index) => (
                <div
                  key={`${month.name}-${index}`}
                  className="text-xs text-muted-foreground"
                  style={{ marginLeft: index === 0 ? `${month.offset * 13}px` : '39px' }}
                >
                  {month.name}
                </div>
              ))}
            </div>
            
            {/* Heatmap grid */}
            <div className="flex gap-1">
              {/* Day labels */}
              <div className="flex flex-col gap-1 w-8">
                {dayLabels.map((day, index) => (
                  <div
                    key={day}
                    className={`h-3 flex items-center text-xs text-muted-foreground ${
                      index % 2 === 1 ? '' : 'invisible'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Activity grid */}
              <TooltipProvider>
                <div className="flex gap-1">
                  {weeklyData.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((day, dayIndex) => (
                        <Tooltip key={`${weekIndex}-${dayIndex}`}>
                          <TooltipTrigger asChild>
                            <div
                              className={`w-3 h-3 rounded-sm cursor-pointer border border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-500 transition-all ${
                                day.date ? getColorClass(getIntensityLevel(day.count)) : 'bg-transparent border-transparent'
                              }`}
                              onMouseEnter={() => day.date && setHoveredCell(day)}
                              onMouseLeave={() => setHoveredCell(null)}
                            />
                          </TooltipTrigger>
                          {day.date && (
                            <TooltipContent>
                              <p className="font-medium">
                                {day.count} {day.count === 1 ? 'workout' : 'workouts'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatTooltipDate(day.date)}
                              </p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      ))}
                    </div>
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </div>
        </div>
        
        {/* Summary stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-muted-foreground">
          <div>
            {fullYearData.filter(d => d.count > 0).length} days active in the last year
          </div>
          <div>
            Total: {fullYearData.reduce((sum, d) => sum + d.count, 0)} workouts
          </div>
        </div>
      </CardContent>
    </Card>
  );
}