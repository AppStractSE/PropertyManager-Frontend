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
  create: {
    user: {
      onMutate: {
        message: "Ny användare skapad! 🎉",
      },
      onDelete: {
        message: "Användaren och dess tillhörande data har raderats.",
      },
    },
    area: {
      onMutate: {
        message: "Nytt område tillagt!",
      },
      onDelete: {
        message: "Området och dess tillhörande data har raderats.",
      },
    },
    city: {
      onMutate: {
        message: "Ny ort tillagd!",
      },
      onDelete: {
        message: "Orten och dess tillhörande data har raderats.",
      },
    },
    subcategory: {
      onMutate: {
        message: "Underkategorin har lagts till",
      },
      onDelete: {
        message: "Underkategorin har raderats.",
      },
    },
    category: {
      onMutate: {
        message: "Kategorin har lagts till",
      },
      onDelete: {
        message: "Kategorin och dess tillhörande data har raderats.",
      },
    },
    customer: {
      onMutate: {
        message: "Ny kund skapad",
      },
      onDelete: {
        message: "Kunden och dess tillhörande data har raderats.",
      },
    },
    team: {
      onMutate: {
        message: "Nytt team skapat",
      },
      onDelete: {
        message: "Teamet och dess tillhörande data har raderats.",
      },
    },
    chore: {
      onMutate: {
        message: "Ny syssla skapad",
      },
      onDelete: {
        message: "Sysslan och dess tillhörande data har raderats.",
      },
    },
    customerchore: {
      onMutate: {
        message: "Sysslan har lagts till på kund",
      },
      onDelete: {
        message: "Kundsysslan och dess tillhörande data har raderats.",
      },
    },
  },
};

export default toasts;
