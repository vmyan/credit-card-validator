import '../style.css';        // CSS лежит в src/
import { setupCardWidget } from './DOM';  // JS модуль в той же папке

const container = document.createElement('div');
container.className = 'card-container';
document.body.appendChild(container);

setupCardWidget(container);
