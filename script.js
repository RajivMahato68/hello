document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const container = document.querySelector(".container");

    let currentCardIndex = 0;
    let isScrolling = false; // Flag to prevent rapid scrolling

    // Function to ensure infinite scrolling (looping through cards)

    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.2)";
            card.style.zIndex = "1"; // Bring the hovered card to the front
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
            card.style.zIndex = "0"; // Reset the card's position
        });
    });
    const scrollToCard = (index) => {
        // Prevent invalid indices
        if (index < 0) {
            currentCardIndex = cards.length - 1; // Loop to last card
        } else if (index >= cards.length) {
            currentCardIndex = 0; // Loop back to the first card
        } else {
            currentCardIndex = index;
        }

        // Scroll to the selected card
        cards[currentCardIndex].scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };

    // Scroll event handler
    container.addEventListener("wheel", (event) => {
        if (isScrolling) return; // Prevent rapid scrolling

        isScrolling = true; // Block further scrolling until done

        if (event.deltaY > 0) {
            // Scroll down to the next card
            currentCardIndex++;
        } else {
            // Scroll up to the previous card
            currentCardIndex--;
        }

        scrollToCard(currentCardIndex);

        // Reset the scroll lock after a delay (1 second)
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // Adjust this value to control the scroll speed
    });

    // Click event to show the next card (optional)
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            scrollToCard(index + 1);
        });
    });
});
