// The 'responsive' object defines the number of items to be displayed for different screen sizes.

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 }, // Breakpoint for super large desktop screens
    items: 5, // Display 5 items at this breakpoint
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 }, // Breakpoint for desktop screens
    items: 3, // Display 3 items at this breakpoint
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 }, // Breakpoint for tablet screens
    items: 2, // Display 2 items at this breakpoint
  },
  mobile: {
    breakpoint: { max: 464, min: 0 }, // Breakpoint for mobile screens
    items: 1, // Display 1 item at this breakpoint
  },
};
