import $ from "../../node_modules/jquery/dist/jquery.min.js";

$(() => {
  const decOfNum = (number, titles) => {
    const decCache = [],
      decCases = [2, 0, 1, 1, 1, 2];

    if (!decCache[number])
      decCache[number] =
        number % 100 > 4 && number % 100 < 20
          ? 2
          : decCases[Math.min(number % 10, 5)];
    return titles[decCache[number]];
  };

  // Set the date we're counting down to
  const countDownDate = new Date(
    "Friday, January 1, 2021 7:00:00 AM GMT+07:00"
  ).getTime();

  // Update the count down every 1 second
  const counter = setInterval(() => {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    const res = `${days} ${decOfNum(days, [
      "день",
      "дня",
      "дней",
    ])} ${hours} ${decOfNum(hours, [
      "час",
      "часа",
      "часов",
    ])} ${minutes} ${decOfNum(minutes, [
      "минута",
      "минуты",
      "минут",
    ])} ${seconds} ${decOfNum(seconds, ["секунда", "секунды", "секунд"])}`;

    $("#countdown").html(res);

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(counter);
      $("#countdown").html("скоро");
    }
  }, 1000);
});
