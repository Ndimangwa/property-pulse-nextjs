import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";

export async function POST(request: Request) {
    try {
        await connectDB();
        const users = await User.find({});
        if (!users) {
            return NextResponse.json(
                { error: 'Users not found' },
                { status: 400 }
            );
        }
        const properties = await request.json();
        const user_length = users.length;
        //We need to iterate through array
        properties.map(async (property, index) => {
            //remove _id
            delete property._id;
            property.owner = users[index % user_length]._id;
            //Working with images
            const imageUrls = [];
            for (const imageName of property.images) {
                const filePath = path.join(
                    process.cwd(),
                    "public",
                    "images",
                    "properties",
                    imageName
                );

                if (!fs.existsSync(filePath)) {
                    return NextResponse.json(
                        { error: "File Not Exists" },
                        { status: 400 }
                    );
                }
                const imageFile = fs.readFileSync(filePath);
                const imageBase64 = imageFile.toString("base64");
                const result = await cloudinary.uploader.upload(
                    `data:image/png;base64,${imageBase64}`,
                    {
                        folder: "property-pulse",
                    }
                );

                imageUrls.push(result.secure_url);
            }
            property.images = imageUrls;
            //save this property
            const newProperty = new Property(property);
            await newProperty.save();
        });
        //Now push to mongodb
        return NextResponse.json(
            { message: 'Property created', data: properties },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
export async function GET() {
    return NextResponse.json(
        { message: 'Your property list is here' },
        { status: 200 }
    );
}