# Inter-Timeline Commenting System

- **Demo:** https://www.youtube.com/watch?v=qCtySmrToEM
- **DevPost:** https://devpost.com/software/inter-timeline-commenting-system

## Inspiration

Initially, we had thought about creating an IPFS-based chatroom. This would have allowed anyone to chat based off a word like "cats" or "food." While still thinking about what to do, we were inspired by the Wayback Machine (internet archival tool) and storing snapshots of websites. We thought that since websites change constantly, comments could fall out of the loop. With ITCS, we preserve the historical context of each comment by linking it to an immutable snapshot of the website on IPFS at the moment of posting the comment. This way, we can build a universal commenting system while still making sure comments remain contextually accurate.

## What it does

The Inter-Timeline Commenting System loads any webpage and allows the user to make comments on it. In addition, they can see other comments and the state of the website when those comments were made. Once a comment is submitted, a snapshot is generated using wget, linked to that comment, and uploaded onto IPFS. We are then able to retrieve the state of the website from when each comment was posted.

## How we built it

For the frontend, we used React to create a responsive UI that was easy to navigate. From there, we connect with a database to handle chat messages and IPFS, where we store website snapshots. Specifically, to store the website into IPFS, we run a script to scrape the website using wget and upload it onto our IPFS node. Taking advantage of hash-based optimizations on IPFS, we're able to store many snapshots while avoiding duplicate information.

## Challenges we ran into

As a team with mixed experience, it was hard managing time and dividing up tasks. We had some wifi issues where CalVistor was blocking p2p IPFS connections (Airbears2 and Eduroam were down >\_<). We also had trouble using OrbitDB (IPFS based database) since it was still in alpha and had very limited documentation. This led to us rethinking parts of our design and coming up with different approaches.

## Accomplishments that we're proud of

We were brainstorming our idea for a very long time, and we're especially proud of the fact that we were able to finish despite starting during the afternoon on the second day. We loved learning new technologies and it was certainly a challenge to figure out how to make them work together in such a short time frame. We ran into many bugs and roadblocks on the way, and we're proud that we were able to solve these issues and get a fully functional prototype built.

## What we learned

We learned a lot about IPFS and how cool it is but also some of its current drawbacks. We loved the concept of hash-based content addressing, and it was different from data storage tools we've worked with in the past.

## What's next for Inter-Timeline Commenting System

We would like to decentralize our comment system next, so that everything on the website is stored on IPFS. Currently, we store only snapshots due to limitations in IPFS database solutions. As this technology matures, we would love to adapt our project to be fully served from IPFS. Currently, comments are anonymous, so another thing we would like to add is some sort of authentication system and user accounts. This allows for users to view comment histories and also helps with comment moderation and the reduction of spam.
