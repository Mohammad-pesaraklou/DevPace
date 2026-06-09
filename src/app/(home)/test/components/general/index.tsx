import React from "react";

function MainIndex() {
  const obj_one = {
    name: "mohammad",
    age: 20,
    permissions: ["user"],
    address: { city: "Tehran", country: "Iran" },
  };

  const obj_two = {
    title: "programmer",
    experience: 3,
    permissions: ["programmer"],
    address: { city: "Yazd", zip: "12345" },
  };
  const isObject = (item: any): Record<string, any> => {
    return item && typeof item === "object" && !Array.isArray(item);
  };

  function deepMerge<T extends object, U extends object>(
    target: T,
    source: U,
  ): T & U {
    let output = { ...target } as any;

    if (isObject(target) && isObject(source)) {
      Object.keys(output).forEach((key) => {
        const targetVal = target[key] as any;
        const sourceVal = source[key] as any;

        if (Array.isArray(targetVal) && Array.isArray(sourceVal)) {
          output = { ...output, [key]: [...targetVal, sourceVal] };
        } else if (isObject(targetVal) && isObject(sourceVal)) {
          output = { ...output, ...deepMerge(targetVal, sourceVal) };
        } else {
          output = { ...output, [key]: sourceVal };
        }
      });
    }

    return output;
  }

  const result = deepMerge(obj_one, obj_two);
  console.log(result);

  /* خروجی نهایی:
{
  name: "mohammad",
  age: 20,
  title: "programmer",
  experience: 3,
  permissions: ["user", "programmer"],
  address: { city: "Yazd", country: "Iran", zip: "12345" }
}
*/

  return <div>MainIndex</div>;
}

export default MainIndex;

// سلام ببین من دارم برای یه مصاحبه پوزیشن فرانت اند میدلول / میدلول رو به بالا اماده میشدم این چند وفت اخیر.همونجور که میدونی من تجربه کارواقعی داشتم اما توی مصاحبه های رسمی شرکت نداشتم تا الان و اکثرا از طریق اشناییت و رزومم کار کردم.

// حالا دارم رزومه ارسال میکنم و میخوام تمرین های حل مسله واقعی داشته باشیم (کد زدن) چون در مفاهیم تعریقی و تیوری خوبم اما کمی در تمرین های حل مسله سخت مشکل دارم و میخوام همونم برطرف کنم و ۱۰۰ درصد اماده بشم برای مصاحبه.حالا سوالی نیازه قبل شروع بپرس که بعدش استارت بزنیم.

// مهارت هایی که بلدم این ها هستند:

// Technical Skills

// Languages & Core Technologies : JavaScript (ESNext), TypeScript, HTML5, CSS3

// Frameworks & Libraries : React.js (Hooks, Context API), Next.js, Node.js & Express.js

// State Management : Redux Toolkit, React Query , Zustand

// Architecture & APIs : REST API Design, GraphQL, Reusable Component Architecture, WebSockets, Software Architecture Patterns & System Design Basics

// Styling & UI/UX : TailwindCSS, CSS-in-JS, Component Libraries ( Material UI , Shadcn), Web Accessibility (a11y, WCAG)

// Tools & Performance: Build Tools (Webpack), Performance Optimization, Core Web Vitals
