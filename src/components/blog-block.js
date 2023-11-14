import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';
import { getUser } from '../auth.js';

class BlockBlock extends LitElement {
  static properties = {//Defining properties for blog post 
    _blogPosts: { state: true },
    blogTitle: { type: String },
    blogContent: { type: String },
  }

  static styles = css`
  :host {
    margin: 1em;
  }
  .blogpost {
    text-align: left;
  }
  .blogpost h2 {
    background-color: pink;
    text-transform: capitalize;
  }
  `;

  constructor() {
    super();
    this.blogTitle = '';
    this.blogContent = '';

    const blogUrl = `${BASE_URL}blog`;
    fetch(blogUrl)
        .then(response => response.json())
        .then(blogPosts => {
            this._blogPosts = blogPosts.posts; 
        });
  }
// A simple formatter that just splits text into paragraphs and 
  // wraps each in a <p> tag
  // a fancier version could use markdown and a third party markdown
  // formatting library
  static formatBody(blogText) {
    if (!blogText) return html`<p>No content</p>`;
    const paragraphs = blogText ? blogText.split('\r\n') : [];
    return paragraphs.map(paragraph => html`<p>${paragraph}</p>`);
  }

  _handleTitleInput(e){
    this.blogTitle = e.target.value;
  }

  _handleContentInput(e) {
    this.blogContent = e.target.value;
  }

  async _submitForm(e) {
    e.preventDefault();

    const userInformation = getUser();
    if (!userInformation) {
      alert('You must be logged in to post a blog');
      return;
    }

    const newPost = {
      title: this.blogTitle,
      content: this.blogContent,
      userId: userInformation.id,
    };

    try {
      const response = await fetch(`${BASE_URL}blog`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Basic ${userInformation.token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.blogTitle = '';
      this.blogContent = '';

      fetch(`${BASE_URL}blog`)//getting the updateted blog posts
        .then(response => response.json())
        .then(blogPosts => {
          this._blogPosts = blogPosts.posts;
        });

      } catch (error) {
        console.error(error);
      }
  }

  render() {//rendering the content for blog post 
    if (!this._blogPosts)
      return html`Loading...`;

    return html`
      <form @submit="${this._submitForm}">
        <label>
          Title:
          <input type="text" .value="${this.blogTitle}" @input="${this._handleTitleInput}">
        </label>
        <label>
          Content:
          <textarea .value="${this.blogContent}" @input="${this._handleContentInput}"></textarea>
        </label>
        <button type="submit">Post</button>
      </form>

      ${this._blogPosts.map(post => html`<div class="blogpost">
        <h2>${post.title}</h2>
        <h3>By ${post.name}</h3>
        ${BlockBlock.formatBody(post.content)}
      </div>`)}
    `;
  }
}

customElements.define('blog-block', BlockBlock);
