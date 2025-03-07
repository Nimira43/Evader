import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

class Box extends THREE.Mesh {
  constructor({
    width,
    height,
    depth,
    colour = '#ff4500',
    velocity = {
      x: 0,
      y: 0,
      z: 0
    },
    position = {
      x: 0,
      y: 0,
      z: 0
    }

  }) { 
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color: colour })
    )
    this.width = width
    this.height = height
    this.depth = depth
    this.position.set(position.x, position.y, position.z)
    this.bottom = this.position.y - this.height / 2
    this.top = this.position.y + this.height / 2
    this.velocity = velocity
     
  }
  update(group) {
    this.bottom = this.position.y - this.height / 2
    this.top = this.position.y + this.height / 2
    this.position.y += this.velocity.y
  
    if (this.bottom + this.velocity.y <= ground.top) this.velocity.y = -this.velocity.y
  }
}

const cube = new Box({
  width: 1,
  height: 1,
  depth: 1,
  velocity: {
    x: 0,
    y: -0.01,
    z: 0
  }
})
cube.castShadow = true
scene.add(cube)

const ground = new Box({
  width: 5,
  height: 0.5,
  depth: 10,
  colour: '#008080',
  position: {
    x: 0,
    y: -2,
    z: 0
  }
})
  
ground.receiveShadow = true
scene.add(ground)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.y = 3
light.position.z = 2
light.castShadow = true
scene.add(light)
camera.position.z = 5

const animate = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
  cube.update(ground)

  // cube.position.y += -0.01
}

animate()