export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    /* Menu Scene */
    this.load.image('menuBackgroud', 'assets/menu/menuBack.png')
    this.load.atlas("menuButton", 'assets/menu/menuButton.png', 'assets/menu/menuButton.json')

    /* Main Scene */
    // Template
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png');
    // Sprites 
    this.load.image('bullet', 'assets/sprites/bullet.png');
    
    // PropHunt Map
    this.load.image('build_atlas', 'assets/maps/fest_room/build_atlas.png');
    this.load.image('indoor1', 'assets/maps/fest_room/indoor1.png');
    this.load.image('indoor2', 'assets/maps/fest_room/indoor2.png');
    this.load.image('indoor3', 'assets/maps/fest_room/indoor3.png');
    this.load.tilemapTiledJSON('map_fest_room', 'assets/maps/fest_room/fest_room_map.json');
    this.load.atlas('fest_room_prop_atlas', 'assets/maps/fest_room/fest_room_prop.png', 'assets/maps/fest_room/fest_room_prop.json');    
    
    // Tuxmon player
    this.load.atlas("misa", "assets/atlas/players/misa.png", "assets/atlas/players/misa.json")
  }

  create() {
    this.scene.start('MenuScene');
  }
}
