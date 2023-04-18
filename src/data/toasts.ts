const toasts = {
  generic: {
    onError: {
      message: "Något gick fel, försök igen senare.",
    },
  },
  comments: {
    onMutate: {
      message: "Din kommentar har laddats upp",
    },
    onDelete: {
      message: "Din kommentar har raderats.",
    },
  },
  images: {
    onMutate: {
      message: "Din bild har laddats upp.",
    },
    onDelete: {
      message: "Din bild har raderats.",
    },
  },
  choreStatuses: {
    onMutate: {
      message: "Syssla klarmarkerad. Bra jobbat! 🎆",
    },
  },
};

export default toasts;
