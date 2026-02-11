import properties from '@/sample-data/properties.json';
async function push()   {
    const response = await fetch('http://localhost:3000/api/properties', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(properties)
    });
    const data = await response.json();
    console.log(data);
}
push();