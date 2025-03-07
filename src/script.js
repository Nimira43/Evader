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
    colour = '#ff4500'
  }) { 
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color: colour })
    )
    this.width = width
    this.height = height
    this.depth = depth
    this.bottom = this.position.y - this.height / 2
    this.top = this.position.y + this.height / 2
  }
  update() {
    this.bottom = this.position.y - this.height / 2
    this.top = this.position.y + this.height / 2
  }
}

const cube = new Box({
  width: 1,
  height: 1,
  depth: 1,
})
cube.castShadow = true
scene.add(cube)

const ground = new Box({
  width: 5,
  height: 0.5,
  depth: 10,
  colour: '#008080'
})
  
ground.receiveShadow = true
ground.position.y = -2
scene.add(ground)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.y = 3
light.position.z = 2
light.castShadow = true
scene.add(light)
camera.position.z = 5



const animate = () => {
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)

  // cube.position.y += -0.01
}

animate()