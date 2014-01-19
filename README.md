Pragm Note
====
Pragm is an Open Source multiuser Scratchpad. Check out the <a href="http://demo.pragm.de/">demo</a>. [UNSTABLE: We take no warranty on bla]

Pull Requests are appreciated and welcomed.

## Features/Already Done/Current Siutation:

- Pragm is a RichText.editor which has a (currently) simple file-explorer
- Pragm is built upon a node.js WebSocket server which synchronizes documents to the editor in realtime
- Because each key event/input synchronizes with the server immediately the web application produces a huge amount of traffic.
- To address this problem, Pragm contains a differential algorithm which has resulted in a siginificant decrease in traffic produced by the synchronization. The synchronization has very high efficency currently and needs less traffic than Google Docs at this time.

## Ideas for the Future:

- Expand the editor with drawing functions, math formulas, etc. and whatever you can imagine (& code)
- Build up bigger functionality to explore files and edit user settings
- Show which user has edited which element
- (maybe, at some point in the future) Add more editors (presentation, spreadsheet, etc.)

Actually the "sync engine" runs pretty well and is flexible enough to add more and more functions to Pragm. Also it is possible to use the basis of Pragm to create new, completely different web applications.

Furthermore, I plan to build a js-library for differential realtime synchronization.

## How to start a quick Demo:
 - install node.js
 - in the first line of bin/server/serverBuild.js, you can change the server-port
 - run bin/server/serverBuild.js with node in the same directory (the script needs to find data/)
 > Command: .../bin/server/>node serverBuild.js
 - open bin/client/index.html with Google Chrome (Safari should work too, however sometimes it behaves weirdly. Most of the time it's okay though.)
  

<table>
  <tr>
    <th>Username</th><th>Password</th>
  </tr>
  <tr>
    <td>Bob</td><td>123</td>
  </tr>
  <tr>
    <td>System</td><td>boss</td>
  </tr>
</table>

## Known Bugs:
Usage of websockets results in problems with usage of Pragm behind http proxys like squid.

## Website:

http://www.pragm.de/
