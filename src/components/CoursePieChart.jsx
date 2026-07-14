import { PieChart } from "react-minimal-pie-chart";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Loading from "./Loading/Loading";
import { useGetCoursesQuery } from "../Redux/features/api/coursesApi";
import { FaChartPie } from "react-icons/fa";

// Define a consistent color palette
const COLOR_PALETTE = {
  "web-development": "#FF6B6B",
  "app-development": "#4ECDC4",
  "game-development": "#45B7D1",
  "uiux-designer": "#96CEB4",
  "machine-learning": "#FFEAA7",
  default: "#FDDB3A",
};

const CoursePieChart = () => {
  // 1. All hooks are now at the top level
  const { data, isLoading, isError } = useGetCoursesQuery();
  const [chartData, setChartData] = useState([]);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const containerRef = useRef(null);
  const legendItemRefs = useRef([]);
  const pieChartRef = useRef(null);

  // 2. Data processing is moved inside a useEffect for clarity
  useEffect(() => {
    if (data) {
      const activeCourses = data.filter(
        (course) => course.courseStatus === "active",
      );

      // Dynamically group courses by category
      const categoryCounts = activeCourses.reduce((acc, course) => {
        const category = course.category || "uncategorized";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      // Create chart data from the dynamic groups
      const processedData = Object.entries(categoryCounts).map(
        ([category, value]) => ({
          title: category
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          value,
          color: COLOR_PALETTE[category] || COLOR_PALETTE.default,
          category,
        }),
      );
      setChartData(processedData);
    }
  }, [data]);

  // Animation useEffect
  useEffect(() => {
    if (chartData.length === 0 || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // ... (your GSAP animations can go here)
      // Example entrance animation:
      gsap.fromTo(
        pieChartRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" },
      );

      gsap.fromTo(
        legendItemRefs.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out",
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [chartData]); // Re-run animations if data changes

  // 3. Conditional returns are now AFTER all hook calls
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading course data.
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center text-slate-500">
        <FaChartPie className="mb-4 h-12 w-12 text-slate-300" />
        <h3 className="font-bold">No Course Data Available</h3>
      </div>
    );
  }

  const totalCourses = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div ref={containerRef} className="rounded-xl bg-slate-50 p-6 shadow-lg">
      <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
        {/* Pie Chart */}
        <div ref={pieChartRef} className="relative mx-auto h-64 w-64">
          <PieChart
            data={chartData}
            lineWidth={40}
            paddingAngle={2}
            animate
            animationDuration={1000}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
            labelStyle={{
              fontSize: "8px",
              fill: "#fff",
              fontWeight: "bold",
              textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
            }}
            labelPosition={70}
            segmentsStyle={(index) => ({
              transition: "all 0.3s ease",
              transform: hoveredSegment === index ? "scale(1.05)" : "scale(1)",
              transformOrigin: "center center",
            })}
            onMouseOver={(_, index) => setHoveredSegment(index)}
            onMouseOut={() => setHoveredSegment(null)}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800">
                {totalCourses}
              </div>
              <div className="text-sm text-slate-500">Total Courses</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-3 lg:w-1/2">
          {chartData.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => (legendItemRefs.current[index] = el)}
              className="flex items-center rounded-lg p-3 transition-all duration-300"
              style={{
                backgroundColor:
                  hoveredSegment === index ? `${item.color}20` : "transparent",
              }}
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <span
                className="mr-4 h-4 w-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="flex-1 font-medium text-slate-700">
                {item.title}
              </span>
              <span className="font-bold text-slate-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePieChart;
