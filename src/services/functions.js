export const capitalizeWords = (str) => {
  const words = str.split(" ");

  const capitalizedWords = words.map((word) => {
    if (word.toLowerCase() !== "and") {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return word;
    }
  });

  return capitalizedWords.join(" ");
};

export const formatedDate = (stringDate) => {
  const date = new Date(stringDate);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
};

export const truncate = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.substring(0, maxLength) + "...";
  }
};
