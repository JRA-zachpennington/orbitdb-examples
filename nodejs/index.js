/**
 * A simple nodejs script which launches an orbitdb instance and creates a db 
 * with a single record.
 * 
 * To run from the terminal:
 * 
 * ```bash
 * node index.js
 * ```
 */
import { createOrbitDB } from '@orbitdb/core'
import * as Ipfs from 'ipfs-core'

const config = {
  Addresses: {
    API: '/ip4/127.0.0.1/tcp/0',
    Swarm: [
      // Use IPFS dev signal server
      '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
      // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
      // Use local signal server
      // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
      '/ip4/0.0.0.0/tcp/0',

    ],
    Gateway: '/ip4/0.0.0.0/tcp/0'
  },
  Bootstrap: [],
  Discovery: {
    MDNS: {
      Enabled: true,
      Interval: 0
    },
    webRTCStar: {
      Enabled: false
    }
  }
}

const ipfs = await Ipfs.create({ repo: './ipfs', config: config })

const orbitdb = await createOrbitDB({ ipfs: ipfs, id: 'nodejs', directory: './orbitdb' })
// console.log(orbitdb);

const db = await orbitdb.open('nodejs')
console.log(db.address);

await db.add('hello world 1')

for await (const res of db.iterator()) {
  console.log(res)
}

// await db.close()
// await orbitdb.stop()
// await ipfs.stop()

// process.exit(0)
