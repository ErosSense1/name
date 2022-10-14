namespace Game {
	export class Eros {
		public static canvas = document.querySelector('canvas');
		public static ctx = Eros.canvas?.getContext('2d');
		private static lastKey_X: string;
		private static lastKey_Y: string;
		static int: any;
		static id: any;

		// inicio
		static start() {
			let x = prompt('select a gun: ');
			if (Eros.canvas) {
				let canvas = Eros.canvas;
				canvas.width = 1024;
				canvas.height = 640;
				canvas.style.position = 'absolute';
				canvas.style.top = '50%';
				canvas.style.left = '50%';
				canvas.style.transform = 'translate(-50%,-50%)';
				canvas.style.fontSize = '40px';
			}
			if (x) {
				Player.selected = parseInt(x);
			} else {
				Player.selected = 0;
			}
			Eros.controls();
			Eros.update();
			//colt
			if (Player.selected === 0) {
				Weapon.ammo = 6;
				Weapon.maxAmmo = 6;
			}
			//ak47
			if (Player.selected === 1) {
				Weapon.ammo = 30;
				Weapon.maxAmmo = 30;
			}
			//FNscar
			if (Player.selected === 2) {
				Weapon.ammo = 32;
				Weapon.maxAmmo = 32;
			}
			//uzi
			if (Player.selected === 3) {
				Weapon.ammo = 25;
				Weapon.maxAmmo = 25;
			}
			//mp40
			if (Player.selected === 4) {
				Weapon.ammo = 32;
				Weapon.maxAmmo = 32;
			}
			//p90
			if (Player.selected === 5) {
				Weapon.ammo = 50;
				Weapon.maxAmmo = 50;
			}
		}

		// animacion
		static update() {
			if (Player.selected === 0) {
				// colt
				Weapon.speed = 3;
				Weapon.interval = 700;
			}
			if (Player.selected === 1) {
				// ak47
				Weapon.speed = 9;
				Weapon.interval = 200;
			}
			if (Player.selected === 2) {
				// uzi
				Weapon.speed = 8;
				Weapon.interval = 60;
			}
			if (Player.selected === 3) {
				// scar
				Weapon.speed = 8;
				Weapon.interval = 150;
			}
			if (Player.selected === 4) {
				// mp40
				Weapon.speed = 8;
				Weapon.interval = 100;
			}
			if (Player.selected === 5) {
				// p90
				Weapon.speed = 10;
				Weapon.interval = 30;
			}
			//
			if (Player.selected < 0) {
				Player.selected = Player.gun.length - 1;
			} else if (Player.selected > Player.gun.length - 1) {
				Player.selected = 0;
			}
			// key controls handler
			if (Eros.lastKey_X == 'd') {
				Player.vel.x -= 0.1;
				if (Player.vel.x <= 0) {
					Player.vel.x = 0;
				}
			}
			if (Eros.lastKey_X == 'a') {
				Player.vel.x += 0.1;
				if (Player.vel.x >= 0) {
					Player.vel.x = 0;
				}
			}
			if (Eros.lastKey_Y == 's') {
				Player.vel.y -= 0.1;
				if (Player.vel.y <= 0) {
					Player.vel.y = 0;
				}
			}
			if (Eros.lastKey_Y == 'w') {
				Player.vel.y += 0.1;
				if (Player.vel.y >= 0) {
					Player.vel.y = 0;
				}
			}

			if (Eros.lastKey_X === '') {
				if (Player.vel.x > 4.7) {
					Player.vel.x = 5;
				}
				if (Player.vel.x < -4.7) {
					Player.vel.x = -5;
				}
			}
			if (Eros.lastKey_Y === '') {
				if (Player.vel.y > 4.7) {
					Player.vel.y = 5;
				} else if (Player.vel.y < -4.7) {
					Player.vel.y = -5;
				}
			}

			// llama la funcion update indefinidamente
			requestAnimationFrame(Eros.update);
			if (Eros.canvas) {
				if (Eros.ctx) {
					// limpialla pantalla
					Eros.ctx.clearRect(0, 0, Eros.canvas.width, Eros.canvas.height);

					// ammo
					Eros.ctx.font = 'bold 48px serif';
					Eros.ctx.fillStyle = 'red';
					Eros.ctx.fillText(Weapon.ammo + '', 20, 50);
					// actualiza al jugador
					Player.update();
					// actualiza la posision del mouse
					Mouse.update();
				}
			}
		}

		// controles
		static controls() {
			window.addEventListener('keydown', Eros.keyDownHandler);
			window.addEventListener('keyup', Eros.keyUpHandler);
			Eros.canvas?.addEventListener('mousedown', Eros.clickDHandler);
			Eros.canvas?.addEventListener('mouseup', Eros.clicUkHandler);
		}

		// keydown
		public static keyDownHandler(e: any) {
			switch (e.key) {
				case 'd':
					Eros.lastKey_X = '';
					Player.vel.x += 3;
					break;
				case 'a':
					Eros.lastKey_X = '';
					Player.vel.x -= 3;
					break;
				case 's':
					Eros.lastKey_Y = '';
					Player.vel.y += 3;
					break;
				case 'w':
					Eros.lastKey_Y = '';
					Player.vel.y -= 3;
					break;
			}
		}

		public static keyUpHandler(e: any) {
			switch (e.key) {
				case 'd':
					Eros.lastKey_X = 'd';
					break;
				case 'a':
					Eros.lastKey_X = 'a';
					break;
				case 's':
					Eros.lastKey_Y = 's';
					break;
				case 'w':
					Eros.lastKey_Y = 'w';
					break;
				case 'r':
					Weapon.ammo = Weapon.maxAmmo;
					break;
			}
		}

		// click
		public static clickDHandler(e: any) {
			Eros.id = Eros.int = setInterval((xd) => {
				Player.shoot(e);
				Weapon.ammo--;
				if (Weapon.ammo <= 0) {
					Weapon.ammo = 0;
				}
			}, Weapon.interval);
		}
		public static clicUkHandler(e: any) {
			clearInterval(Eros.id);
		}
	}

	// jugador
	class Player {
		static pos = { x: 512 - 64, y: 320 - 64 };
		static vel = { x: 0, y: 0 };
		private static size = { w: 64, h: 64 };
		static player = new Image();
		static bot = './assets/player/bmo.png';
		static weapon = new Image();
		static gunShot = new Audio('./sfx/shot.wav');
		static gun = [
			'./assets/guns/gun.png',
			'./assets/guns/AK47.png',
			'./assets/guns/Uzi.png',
			'./assets/guns/FNScar.png',
			'./assets/guns/MP40.png',
			'./assets/guns/P90.png',
		];
		static selected = 0;
		// frame
		static fps = 0;
		static frame_width = 0;
		static current_frame = 0;
		// dibuja al jugadorr
		static draw() {
			Player.player.src = Player.bot;
			const c = Eros.ctx;
			if (c && Eros.canvas) {
				c.imageSmoothingEnabled = false;
				c.save();
				c.translate(
					Player.pos.x + Player.size.w / 2,
					Player.pos.y + Player.size.h / 2,
				);
				if (Mouse.pos.x < Player.pos.x) {
					c.scale(-1, 1);
				}
				Player.frame_width = Player.player.width / 4;
				c.drawImage(
					Player.player,
					Player.current_frame * Player.frame_width,
					0,
					Player.frame_width,
					Player.frame_width,
					-32,
					-32,
					64,
					64,
				);
				Player.fps += 1;
				if (Player.fps % 7 === 0) {
					Player.current_frame++;
				}
				if (Player.current_frame > 3) {
					Player.current_frame = 0;
				}
				c.restore();
			}
		}

		// dispara
		static shoot(e: any) {
			if (Weapon.ammo > 0) {
				if (Eros.canvas) {
					let angle = Math.atan2(
						Mouse.pos.y - Player.pos.y,
						Mouse.pos.x - Player.pos.x,
					);

					let speed = Weapon.speed;
					let x = Math.cos(angle) * speed;
					let y = Math.sin(angle) * speed;
					let xd = new Audio('./sfx/shot.wav');
					xd.play();

					Bullet.bullets.push(new Bullet(Player.pos.x, Player.pos.y, x, y));
				}
			} else {
				let ad = new Audio('./sfx/click.wav');
				ad.play();
			}
		}
		// dibuja el arma
		static drawGun() {
			if (Eros.ctx) {
				let ctx = Eros.ctx;
				// Store the current context state (i.e. rotation, translation etc..)
				ctx.save();

				let deg =
					((Math.atan2(Player.pos.x - Mouse.pos.x, Player.pos.y - Mouse.pos.y) *
						180) /
						-Math.PI) *
					Math.PI;
				//Convert degrees to radian
				var rad = deg / 180;

				//Set the origin to the center of the player

				if (Mouse.pos.x < Player.pos.x) {
					ctx.translate(
						Player.pos.x + Player.size.w / 2 + 10,
						Player.pos.y + Player.size.h / 2 + 15,
					);
					ctx.scale(-1, 1);
					rad = -deg / 180;
				} else {
					ctx.translate(
						Player.pos.x + Player.size.w / 2 - 10,
						Player.pos.y + Player.size.h / 2 + 15,
					);
				}
				//Rotate the canvas around the origin
				ctx.rotate(0);
				ctx.rotate(rad + 360 - 45 / 2);
				Player.weapon.src = Player.gun[Player.selected];
				//draw the image
				// ctx.drawImage(img, (width / 2) * -1, (height / 2) * -1, width, height);
				ctx.fillStyle = 'red';
				ctx.drawImage(Player.weapon, -16, -32, 64, 64);

				// Restore canvas state as saved from above
				ctx.restore();
			}
		}

		// animacion del judgador
		static update() {
			Player.check_offScreen();
			// draw bullets
			Bullet.bullets.forEach((bull, index) => {
				if (bull) {
					bull.update();
					if (Eros.canvas) {
						if (bull.pos.x < 0) {
							Bullet.bullets.splice(index, bull + index);
						}
						if (bull.pos.x > Eros.canvas.width) {
							Bullet.bullets.splice(index, bull + index);
						}
						if (bull.pos.y < 0) {
							Bullet.bullets.splice(index, bull + index);
						}
						if (bull.pos.y > Eros.canvas.height) {
							Bullet.bullets.splice(index, bull + index);
						}
					}
				}
			});
			Player.draw();
			Player.drawGun();
			Player.pos.x += Player.vel.x;
			Player.pos.y += Player.vel.y;
		}

		// revisa si el jugador sale de la pantall
		static check_offScreen() {
			if (Eros.canvas) {
				let canvas = Eros.canvas;
				if (Player.pos.x < -Player.size.w) {
					Player.pos.x = canvas.width + Player.size.w;
				}
				if (Player.pos.x > canvas.width + Player.size.w) {
					Player.pos.x = -Player.size.w;
				}
				if (Player.pos.y < -Player.size.h) {
					Player.pos.y = canvas.height + Player.size.h;
				}
				if (Player.pos.y > canvas.height + Player.size.h) {
					Player.pos.y = -Player.size.h;
				}
			}
		}
	}

	class Mouse {
		static pos = {
			x: 0,
			y: 0,
		};
		static w = 5;
		static h = 5;

		static update() {
			if (Eros.ctx) {
				let ctx = Eros.ctx;
				ctx.fillStyle = 'blue';
				ctx.fillRect(Mouse.pos.x, Mouse.pos.y, Mouse.w, Mouse.h);
			}
			if (Eros.canvas) {
				Eros.canvas.style.cursor = 'none';
				Eros.canvas.addEventListener('mousemove', (e) => {
					Mouse.pos.x = e.offsetX;
					Mouse.pos.y = e.offsetY;
				});
			}
		}
	}

	export class Bullet {
		static bullets = new Array();
		pos = { x: 0.0, y: 0.0 };
		vel = { x: 0.0, y: 0.0 };
		public constructor(px: any, py: any, x: any, y: any) {
			this.pos = {
				x: px,
				y: py,
			};
			this.vel = {
				x: x,
				y: y,
			};
		}
		draw() {
			if (Eros.ctx) {
				let ctx = Eros.ctx;
				ctx.fillStyle = 'red';
				ctx.fillRect(this.pos.x + 32, this.pos.y + 32, 10, 10);
			}
		}

		update() {
			this.draw();
			if (Eros.ctx) {
				let ctx = Eros.ctx;
				this.pos.x += this.vel.x;
				this.pos.y += this.vel.y;
			}
		}
	}

	class Weapon {
		static damage: any;
		static speed: any;
		static interval: any;
		static ammo: any;
		static maxAmmo: any;
	}
}

Game.Eros.start();
