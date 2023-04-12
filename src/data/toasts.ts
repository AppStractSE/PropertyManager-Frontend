const toasts = {
  generic: {
    onError: {
      message: "Något gick fel, försök igen senare.",
    },
  },
  comments: {
    onMutate: {
      message: "Din kommentar har lagts till.",
    },
    onDelete: {
      message: "Din kommentar har tagits bort.",
    },
  },
  choreStatuses: {
    onMutate: {
      message: "Syssla klarmarkerad. Bra jobbat! 🎆",
    },
  },
};

export default toasts;
