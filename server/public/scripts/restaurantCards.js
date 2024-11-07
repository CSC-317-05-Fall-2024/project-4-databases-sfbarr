/* This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Select all the restaurant cards and add a delete button to each
  document.querySelectorAll('.restaurant-card').forEach(card => {
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      console.log('DeleteBtn clicked');
      deleteRestaurantCard(card.dataset.id, card); // Pass ID # (via data-id attribute) and card element
    });
  });
});

async function deleteRestaurantCard(restaurantId, cardElement) {
  console.log(typeof restaurantId);
  console.log(`Attempting to delete restaurant with ID: ${+restaurantId}`);
  
  try {
      const response = await fetch(`/api/restaurants/${+restaurantId}`, {
          method: 'DELETE', // HTTP: Delete request sent to api.js delete endpoint
      });

      console.log(`Response status: ${response.status}`);
      if (response.status === 204) {
          console.log(`Restaurant with ID ${restaurantId} deleted successfully`);
          cardElement.remove(); // Remove the card from the DOM
      } else {
          console.error(`Failed to delete restaurant with ID ${restaurantId}`);
      }
  } catch (error) {
      console.error('Error during deletion:', error);
  }
}