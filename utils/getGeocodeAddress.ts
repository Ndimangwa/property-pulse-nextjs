const getGeocodeAddress = async (address: string) => {
    try {
        const response = await fetch("/api/geocode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({address})
        });
        if (! response.ok)  {
            throw new Error("Failed to acquire geocode address");
        }
        const data = await response.json();
        return data; //{lat, lng}
    } catch (err)   {
        console.log(err);
        return null;
    }
}
 
export default getGeocodeAddress;