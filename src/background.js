import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({
  antialias: !0,
  alpha: !0
})
const scene = new THREE.Scene
let camera

const triangle = new THREE.Object3D
const particle = new THREE.Object3D
const ball = new THREE.Object3D

function init() {
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.autoClear = !1
  renderer.setClearColor(0, 0)

  document.getElementById('background').appendChild(renderer.domElement)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1e3)

  camera.position.z = 400

  scene.add(camera)
  scene.add(triangle)
  scene.add(particle)
  scene.add(ball)

  const e = new THREE.TetrahedronGeometry(2, 0)
  const n = new THREE.TetrahedronGeometry(16, 0)
  const a = new THREE.OctahedronBufferGeometry(10, 3)
  const r = new THREE.MeshPhongMaterial({
    color: 16777215,
    flatShading: true
  })
  const i = new THREE.MeshPhongMaterial({
    color: 16777215,
    wireframe: true,
    side: THREE.DoubleSide
  })
  const t = new THREE.MeshPhongMaterial({
    color: 16777215,
    flatShading: true
  })

  for (let o = 0; 100 > o; o++) {
    const d = new THREE.Mesh(e, r)

    d.position.set(Math.random() - .5, Math.random() - .5, Math.random() - .5).normalize()
    d.position.multiplyScalar(90 + 700 * Math.random())
    d.rotation.set(2 * Math.random(), 2 * Math.random(), 2 * Math.random())

    particle.add(d)
  }

  const l = new THREE.Mesh(n, i)

  l.scale.x = l.scale.y = l.scale.z = 15
  triangle.add(l)

  const c = new THREE.Mesh(a, t)

  c.scale.x = c.scale.y = c.scale.z = 12
  ball.add(c)

  const s = new THREE.AmbientLight(10066329)

  scene.add(s)

  let E = []

  E[0] = new THREE.DirectionalLight(16777215, 1)
  E[0].position.set(1, 0, 0)

  E[1] = new THREE.DirectionalLight(1173691, 1)
  E[1].position.set(.75, 1, .5),

  E[2] = new THREE.DirectionalLight(8519881, 1)
  E[2].position.set(-.75, -1, .5)

  scene.add(E[0])
  scene.add(E[1])
  scene.add(E[2])

  window.addEventListener('resize', onWindowResize, !1)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)

  particle.rotation.x += 0
  particle.rotation.y -= .004
  triangle.rotation.x += .005
  triangle.rotation.y += .005
  ball.rotation.y += .002

  renderer.clear()

  renderer.render(scene, camera)
}

init()
animate()
