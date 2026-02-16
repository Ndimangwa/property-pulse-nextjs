import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest)    {
    try {
        const {address} = await req.json();
        const response = await fetch(`https://api.latlng.work/api?q=${encodeURIComponent(address)}`, {
            headers: {
                "X-Api-Key": process.env.LATLNG_SERVER_KEY as string
            }
        });
        //Now Post to latlng.work
        const data = await response.json();
        if (! data.features || data.features.length === 0)  {
            return NextResponse.json({
                error: "No results found"
            }, {
                status: 404
            });
        }
        const [lng, lat] = data.features[0].geometry.coordinates;
        return NextResponse.json({lat, lng});
    } catch (err)   {
        return NextResponse.json({
            error: "Geocoding Failed"
        }, {
            status: 500
        });
    }
}