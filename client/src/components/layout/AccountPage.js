import React, { useState, useEffect } from "react"
import Dropzone from "react-dropzone"

const AccountPage = (props) => {
    const { id, email, userName, image } = props.user

    const [profilePicture, setProfilePicture] = useState({
        image: "",
    })

    console.log(profilePicture)

    // const defaultImageSrc = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HHVUf3TYqncgpJXyCMmxyAHaHa%26pid%3DApi&f=1&ipt=93200a074698f6d970d4c1209aca3909d8fc9f313fa825e474633a1e48f2bcea&ipo=images"

    const handleImageUpload = (acceptedImage) => {
        // sets state for the image we want to post
        setProfilePicture({
            ...profilePicture,
            image: acceptedImage[0]
        })
    }

    const addProfilePicture = async () => {

        const newProfilePictureBody = new FormData()
        newProfilePictureBody.append("image", profilePicture.image)

        try {
            const response = await fetch(`/api/v1/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "image/jpeg"
                },
                body: newProfilePictureBody
            })
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            }
            const body = await response.json()
            console.log("body", body)
            setProfilePicture(
                body.profilePicture
            )
        } catch (error) {
            console.error(`Error in addProfilePicture Fetch: ${error.message}`)
        }

    }

    ///handleSubmit needs to handle patch request
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("about to submit")
        addProfilePicture()
    }

    let profileImage

    if(image) {
        profileImage = image
    } else {
        profileImage = null
    }

    return (
        <>
            <h2>Account Details</h2>
            <form className="dropzone" onSubmit={handleSubmit}>
            <Dropzone onDrop={handleImageUpload}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Upload Your Meme - drag 'n' drop or click to upload</p>
                </div>
                </section>
            )}
            </Dropzone>

                <input type="submit" value="Add your new picture!"/>
            </form>

            <img src={profileImage}/>

            <p>Email: {email}</p>
            <p>Username: {userName}</p>
        </>
    )
}

export default AccountPage