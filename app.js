const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

// Рисуем вертикальный луч
function drawVerticalRay(x, color = 'black') {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.strokeStyle = color
    ctx.stroke();
}

// Рисуем горизонтальный луч
function drawHorizontalRay(y, color = 'black') {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.strokeStyle = color
    ctx.stroke();
}

// Рисуем точку
function drawPoint(x, y, color = 'black') {
    ctx.beginPath();
    ctx.ellipse(x, y, 10, 10, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fillStyle = color
    ctx.fill();
}

// Рисуем прямоугольник
// rect - объект типа {x: 12, y: 12, width: 21, height: 44, color: 'green'}
function drawRect(rect) {
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height)
    ctx.fillStyle = rect.color
    ctx.fill();
}

// Рисуем круг
// circle - объект типа {x: 12, y: 12, radius: 32, color: 'green'}
function drawCircle(circle) {
    ctx.beginPath();
    ctx.ellipse(circle.x, circle.y, circle.radius, circle.radius, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fillStyle = circle.color
    ctx.fill();
}

// Рисуем изображение
function drawSprite(sprite) {
    ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height)
}

// Столкновение прямоугольников
// rect1, rect2 - объекты типа {x: 12, y: 12, width: 21, height: 44, color: 'green'}
function checkRectsCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
}

// Столкновение окружностей
// circle1, circle2 - объекты типа {x: 12, y: 12, radius: 32, color: 'green'}
function checkCirclesCollision(circle1, circle2) {
    const distance = Math.sqrt(Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2))

    return distance < (circle1.radius + circle2.radius)
}

// Столкновение окружности и прямоугольника
// circle - объект типа {x: 12, y: 12, radius: 32, color: 'green'}
// rect - объект типа {x: 12, y: 12, width: 21, height: 44, color: 'green'}
function checkCircleRectCollision(circle, rect) {
    let distX = Math.abs(circle.x - rect.x - rect.width / 2);
    let distY = Math.abs(circle.y - rect.y - rect.height / 2);

    if (distX > (rect.width / 2 + circle.radius)) { return false; }
    if (distY > (rect.height / 2 + circle.radius)) { return false; }

    if (distX <= (rect.width / 2)) { return true; }
    if (distY <= (rect.height / 2)) { return true; }

    let dx = distX - rect.width / 2;
    let dy = distY - rect.height / 2;
    return (dx * dx + dy * dy <= (circle.radius * circle.radius));
}

// Произвольное число
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


function getScaleRatio() {
    const screenHeight = Math.min(
        window.innerHeight,
        document.documentElement.clientHeight
    );

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
    );

    //window is wider than the game width
    if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
        return screenWidth / GAME_WIDTH;
    } else {
        return screenHeight / GAME_HEIGHT;
    }
}


class Player{
    constructor(texture, x, y, width, height, xp){
        this.texture = texture;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xp = xp;
    }
    
    heart (health){
        this.xp -= health;
    }
    
    regen (health) {
        this.xp += health;
    }
    
    get_draw_info () {
        return {
            image: this.texture,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
    }
    
    battle (enemy) {
        if (this.xp <= 1 && enemy.xp > 0) {
            won()
        }
        else{
            lose()
        }
    }
};


const punic_cavalery = new Image()
punic_cavalery.src = './carfage_cavalery.jpg'

const rome_legion = new Image()
rome_legion.src = './rome_legion.jpg'

const ferm_img = new Image
ferm_img.src = './wheatSprite.png'

const ground = new Image()
ground.src = './ground.jpg'


const GAME_WIDTH = 350
const GAME_HEIGHT = 200
const MIN_GAME_HEIGHT = 100

let scaleRatio;

function setScreen() {
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    if GAME_HEIGHT * scaleRatio < innerHeight{
        canvas.height = GAME_HEIGHT * scaleRatio
    }
    else{
        canvas.height = MIN_GAME_HEIGHT * scaleRatio
    }
}


setScreen();
//Use setTimeout on Safari mobile rotation otherwise works fine on desktop
window.addEventListener("resize", () => setTimeout(setScreen, 500));

if (screen.orientation) {
    screen.orientation.addEventListener("change", setScreen);
}

let gameState = 0
let font_size;

let fabio = new Player(rome_legion, 300*scaleRatio, 50*scaleRatio, 20*scaleRatio, 20*scaleRatio, 6)
let hanibal = new Player(punic_cavalery, 25*scaleRatio, 50*scaleRatio, 20*scaleRatio, 20*scaleRatio, 6)
let fabioCountObj = document.getElementById('fabio_xp')
let hanibalCountObj = document.getElementById('hanibal_xp')

let dX = 4*scaleRatio
let dY = 3*scaleRatio

canvas.addEventListener('touchmove', function(move){
        move.preventDefault();
        let x = move.changedTouches[0].pageX
        let y = move.changedTouches[0].pageY
        
        if (gameState==0){
            gameState=1
            sound.addEventListener('loadmetadata', function() {
                console.log('sound work')
                sound.play()
            })
        }
        
        if (gameState==1 && x < canvas.width-fabio.width && x > 0 && y < canvas.height-fabio.height && y > 0){
            
            fabio.x = x
            fabio.y = y
        }
        
    })
    
    
canvas.addEventListener('mousemove', function(move){
        
        let x = move.x
        let y = move.y
        
        if (gameState==0){
            gameState=1
        }
        
        if (gameState==1 && x < canvas.width-fabio.width && x > 0 && y < canvas.height-fabio.height && y > 0){
            
            fabio.x = x
            fabio.y = y
        }
        
    })
    

//canvas.addEventListener('')
    
function lose (){
    gameState = 2
}

function won(){
    gameState = 3
}

let ferm = {
    image: ferm_img,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isFarm: 0,
}

setInterval(function(){
    ferm.x = getRandom(10, canvas.width-40)
    ferm.y = getRandom(10, canvas.height-40)
    ferm.isFarm = true
    hanibal.xp -= 1
    fabio.xp -= 1
    fabioCountObj.innerHTML = fabio.xp
    hanibalCountObj.innerHTML = hanibal.xp

}, 10000)

function update_data() {
    if (gameState == 1) {
        if (hanibal.xp == 0){
            if (dY != 1 && dY != -1){
                dY = 1
                dX = 1
            }
        }
        
        if (hanibal.y > canvas.height-hanibal.height || hanibal.y < 0) {
            dY *= -1
        }
        if (hanibal.x > canvas.width-hanibal.width || hanibal.x < 0) {
            dX *= -1
        }
        hanibal.x += dX
        hanibal.y += dY
        
        
        
        if (checkRectsCollision(fabio.get_draw_info(), hanibal.get_draw_info())){
            
            hanibal.battle(fabio)
        }
    }
    
    if (checkRectsCollision(ferm, fabio.get_draw_info()) && ferm.isFarm==true){
        ferm.width = 0
        ferm.height = 0
        ferm.isFarm = false
        
        fabio.xp += 1
        fabioCountObj.innerHTML = fabio.xp
    }
    if (checkRectsCollision(ferm, hanibal.get_draw_info()) && ferm.isFarm==true){
        ferm.width = 0
        ferm.height = 0
        
        ferm.isFarm = false
        
        hanibal.xp += 1
        hanibalCountObj.innerHTML = hanibal.xp
    }
}


function render() {
    ctx.drawImage(ground, 0, 0, canvas.width, canvas.height)
    drawSprite(fabio.get_draw_info())
    drawSprite(hanibal.get_draw_info())
    
    if (gameState == 0){
        ctx.fillStyle = 'white'
        font_size = 40 * scaleRatio
        ctx.font = `${font_size}px serif`;
        ctx.textAlign = 'center'
        ctx.fillText('Наведите курсор', canvas.width/2, 100*scaleRatio, canvas.width)
        ctx.fillText('чтобы начать', canvas.width/2, 140*scaleRatio, canvas.width)
        
        ctx.strokeText('Наведите курсор', canvas.width/2, 100*scaleRatio, canvas.width)
        ctx.strokeText('чтобы начать', canvas.width/2, 140*scaleRatio, canvas.width)
    }
    
    if (gameState == 1){
        if (ferm.isFarm == true){
            if (ferm.width < 35*scaleRatio){
                ferm.height+=2*scaleRatio
                ferm.width+=2*scaleRatio
            }
            drawSprite(ferm)
        }
    }
    
    
    
    
    
    
    if (gameState == 2){
        ctx.fillStyle = 'white'
        
        ctx.font = `${font_size}px serif`;
        ctx.textAlign = 'center'
        ctx.fillText('Вы разбиты', canvas.width/2, 40*scaleRatio, canvas.width)
        ctx.fillText('Ганибал у варот', canvas.width/2, 80*scaleRatio, canvas.width)
        
        ctx.strokeText('Вы разбиты', canvas.width/2, 40*scaleRatio, canvas.width)
        ctx.strokeText('Ганибал у варот', canvas.width/2, 80*scaleRatio, canvas.width)
    }
    
    if (gameState == 3){
        ctx.fillStyle = 'white'
        ctx.font = `${font_size}px serif`;
        ctx.textAlign = 'center'
        ctx.fillText('Ганибал разбит', canvas.width/2, 40*scaleRatio, canvas.width)
        ctx.fillText('На карфаген!!!', canvas.width/2, 80*scaleRatio, canvas.width)
        
        ctx.strokeText('Ганибал разбит', canvas.width/2, 40*scaleRatio, canvas.width)
        ctx.strokeText('На карфаген!!!', canvas.width/2, 80*scaleRatio, canvas.width)
    }
    
}


function game_loop(){
    update_data()
    render()
    window.requestAnimationFrame(game_loop)
}

game_loop()

// var tg = window.Telegram.WebApp;

// tg.expand();
