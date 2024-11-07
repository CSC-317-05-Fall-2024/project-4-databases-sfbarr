
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-restaurant-form');
    form.addEventListener('submit', handleSubmit);
});

const handleSubmit = async (event) => {
    event.preventDefault(); 

    const nameData = document.getElementById('name').value;
    const phoneData = document.getElementById('phone').value;
    const addressData = document.getElementById('address').value;
    const photoData = document.getElementById('photo').value;


    try {
        const response = await fetch(`/api/restaurants`, {
            method: 'POST',
            body: JSON.stringify({
                name: nameData,
                phone: phoneData,
                address: addressData,
                photo: photoData
              }),
              headers: {
                'Content-Type': 'application/json',
              },
        });
  
        console.log(`Response status: ${response.status}`);
        if (response.status === 201) {
            console.log(`Restaurant added successfully`);
        } else {
            console.error(`Failed to add restaurant`);
        }
    } catch (error) {
        console.error('Error during addition:', error);
    }
}


