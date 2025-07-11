## 1

# Create an text-to-video task

curl -X POST https://ark.ap-southeast.bytepluses.com/api/v3/contents/generations/tasks \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer $ARK_API_KEY" \
 -d '{
"model": "seedance-1-0-lite-t2v-250428",
"content": [
{
"type": "text",
"text": "Photorealistic style: Under a clear blue sky, a vast expanse of white daisy fields stretches out. The camera gradually zooms in and finally fixates on a close - up of a single daisy, with several glistening dewdrops resting on its petals. --ratio 16:9 --resolution 720p --duration 5 --camerafixed false"
}
]
}'

## 2 Query a task

# Query a task (please fill in the id returned by step 1)

curl -X GET https://ark.ap-southeast.bytepluses.com/api/v3/contents/generations/tasks/{id} \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer $ARK_API_KEY"

## best practice

{
"model": "seedance-1-0-lite-i2v-250428",
"content": [
{
"type": "text",
"text": "In the sky, soft cotton - like clouds drift with subtle layered motions (some glide lazily, others billow gently as if touched by wind). On the road, a mix of cars, buses, and motorcycles moves smoothly with natural motion blur under the sun’s warm glow. Use cinematic camera techniques: wide establishing shots to capture the sky’s vastness and cloud dynamics, paired with tracking shots that follow vehicles’ steady movement — emphasizing the tranquil flow of clouds and the rhythmic motion of traffic. --resolution 720p --duration 5 --camerafixed false"
},
{
"type": "image_url",
"image_url": {
"url": "https://ark-doc.tos-ap-southeast-1.bytepluses.com/see_i2v.jpeg"
}
}
]  
}

Basic structure: Since text-to-video already has a scene, try to reduce (or even avoid) descriptions of static/unchanged parts. When clearly pointing out moving objects, describe more of the moving parts, including the movement of the main body, the movement/change of the background, and the movement of the camera.
Simple and direct: Try to use simple words and sentence structures. The model will expand the prompt based on our expressions and understanding of the image, generating videos that meet expectations.
Feature description: When the main body has some prominent features, add the prominent features to better position the main body, such as "an old man," "a woman wearing sunglasses," etc. When describing movements, key adverbs of degree must be clear, such as "quickly," "with large amplitude."
Follow the picture: You need to write based on the content of the input picture, and you need to clearly write the main body and the action or mirror movement you want to do. **It is necessary to pay attention that the prompt words should not contradict the facts of the picture content/basic parameters. **For example, there is a man in the picture, and the prompt word says "a woman is dancing"; for example, the background is grassland, and the prompt word says "a man is singing in a coffee shop"; for example, there are no accessories on the hand, and the prompt word says "the hand with accessories"; for example, the basic parameter selects a fixed lens, but the camera surround is written in the prompt word.
Negative prompts do not take effect : The model does not respond to negative prompts.

example of prompt

- Prompt: The hands of the watch rotate at a constant speed. Shot Switch. The man raised his hand to hold his gold glasses, and the soft light hit the dial.
  basic parameters: Unfixed lens, 720p, 5s
- Prompt: Deep in the temple, a man with a backpack finds a statue of an ancient wise man. Camera moves to the left. The statue holds an ancient book in its hands, seemingly guarding some important knowledge.
  basic parameters: Unfixed lens, video ratio 16:9, 720p, 5ss
- Prompt: Family camping, cheerful atmosphere, shots Close-up. Go to the tent and display the 360-degree panorama of the tent.
  basic parameters: Unfixed lens, 720p, 5s
