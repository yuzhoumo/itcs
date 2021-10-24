# Inter-Timeline Commenting System

## Inspiration

Initially, we had thought about creating a chat-room based of hashes. This would have allowed anyone to chat based off a word like "cat" or "food." While still thinking about what to do, we were inspired by the idea of the Wayback Machine and storing moments in time where users could still interact. We also thought that since websites change constantly, comments could fall out of the loop. With ITCS, we preserve the value of each comment.

## What it does

The Inter-Timeline Commenting System loads any webpage and allows the user to make comments. In addition, they can see other comments and the state of the same website when their comments were made. Once a comment is submitted, it gets stored along with an IPFS hash. Using the IPFS hash, we are then able to recreate the websites from when they were stored.

## How we built it

For the front end, we used React to create a simple modern UI that was easy to navigate. From there, we connect with the database and IPFS, where we send and receive data that we display on the website. Specifically, to store the website into IPFS, we run a script to scrape the website and upload it to our IPFS node. To retrieve, we use the hash to retrieve the data and host it on our site.

## Challenges we ran into

As a new team, it was hard managing time and learning the different development tools. First, we had trouble getting IPFS to run and understanding how to retrieve our files. Next, we were also using a fresh database with new API that we found hard to navigate. Finally, we also were having inconsistencies with React and had to scrap our first design.

## Accomplishments that we're proud of

Our proudest accomplishment is being able to successfully save and load websites. It works seamlessly with our website and recreates a fully interactable page. In addition, we love our comment system and how it looks. It's clean, simple, and great to use, being able to bounce back and forth between different moments in a websites history.

## What we learned

We learned a lot about IPFS and how cool it is. The protocols and file storing were great to research and see how they would interact with our idea.

## What's next for Inter-Timeline Commenting System

We would like to decentralize our comment system next, so that everything on the website is immutable. This would mean storing our comments in IPFS along with our website to truly make ITCS a snapshot of history.
