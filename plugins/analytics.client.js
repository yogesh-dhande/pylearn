import splitbee from "@splitbee/web";

export default defineNuxtPlugin(() => {
  let analytics;
  if (process.env.NODE_ENV !== "production") {
    analytics = {
      track(msg, data) {
        console.log(msg, data);
      },
      user: {
        set(data) {
          console.log("setAnalyticsUser", data);
        },
      },
    };
  } else {
    splitbee.init();
    analytics = splitbee;
  }
  return {
    provide: {
      analytics,
    },
  };
});
