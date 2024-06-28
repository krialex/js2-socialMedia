import {  API_KEY } from "../variables.js";
import { load } from "../localStorage/loadInfo.js";
import { getUserProfile } from "../profile/getId.js";

/**
 * Deletes a post from the server.
 * 
 * This function sends a DELETE request to the server to delete a specific post
 * identified by its ID.
 * 
 * @async
 * @param {string} postId2 - The ID of the post to delete.
 * @returns {Promise<void>} A Promise that resolves when the post is successfully deleted.
 * @throws {Error} If an error occurs during the deletion process.
 */

export async function deletePost(postId2) {
    const token = load("token");
   
    try {
        const response = await fetch('https://v2.api.noroff.dev/social/posts/' + `${postId2}`, {
            
            method: 'DELETE',
            headers: { 
               'Content-Type': 'application/json; charset=utf-8',
                "X-Noroff-API-Key": API_KEY,
                "x-Trigger": "CORS",
                "Cache-Control": 'no-cache',
               Authorization: `Bearer ${token}`
            },
        });

        if(!alert('Your post is deleted!')){window.location.reload();}
        
        const result = await response.json();
        console.log(result);
    } catch(error) {
        console.log("Can not find post " + result);
    }
}

