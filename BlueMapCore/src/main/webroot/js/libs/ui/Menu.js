/*
 * This file is part of BlueMap, licensed under the MIT License (MIT).
 *
 * Copyright (c) Blue (Lukas Rieger) <https://bluecolored.de>
 * Copyright (c) contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import $ from 'jquery';

import Element from './Element.js';
import Separator from "./Separator";

export default class Menu {

	constructor(){
		this.element = $('<div class="menu closed"><h1>Menu</h1></div>');
		this.content = $('<div class="content"></div>').appendTo(this.element);
		this.closeButton = $('<div class="close-button"></div>').appendTo(this.element);

		this.children = [];

		this.closeButton.click(this.close);
	}

	addElement(element){
		this.children.push(element);
	}

	update() {
		this.content.html("");
		this.children.forEach(child => {
			this.content.append(child.createElement());
		});

		$(`<div class="footer-separator"></div>`).appendTo(this.content);

		$(`
			<div class="ui-element footer">
				<h1>BlueMap</h1>
				<p>
					Visit BlueMap on <a href="https://github.com/BlueMap-Minecraft">GitHub</a> and <a href="https://discord.gg/zmkyJa3">Discord</a>! 
				</p>
				<h2>Controls</h2>
				<p>
					<kbd>leftclick and drag</kbd> or <kbd>arrow-keys</kbd> to navigate<br>
					<kbd>rightclick and drag</kbd> to rotate your view<br>
					<kbd>scroll</kbd> to zoom in and out
				</p>
			</div>
		`).appendTo(this.content);
	}

	isOpen = () => {
		return !this.element.hasClass('closed');
	};

	toggleOpen = () => {
		this.element.toggleClass('closed');
	};

	open = () => {

		this.element.removeClass('closed');
		this.element.trigger('menu-open');
	};

	close = () => {
		this.element.addClass('closed');
		this.element.trigger('menu-close');
	};

}