'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTitleListSelector = '.titles',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optTagsListSelector = '.tags.list';

const titleClickHandler = function(event){                   //-------------- function titleClickHandler --------------//
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = ''){            //-------------- function generateTitleLinks --------------//

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* [DONE] find the title element */

    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* [DONE] insert link into titleList */

    titleList.insertAdjacentHTML = titleList.insertAdjacentHTML + linkHTML;
    console.log(titleList);

    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags){                          //-------------- function calculateTagsParams --------------//

  const params = {
    max: 0,
    min: 999999,
  };

  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;

}

console.log(calculateTagsParams);

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags(){                                     //-------------- function generateTags --------------//

  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for(let article of articles){

    /* [DONE] find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* [DONE] START LOOP: for each tag */

    for(let tag of articleTagsArray){
      console.log(tag);

      /* [DONE] generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '">' +  tag + '</a></li>' + ' ';
      console.log(linkHTML);

      /* [NEW] check if this link is NOT already in allTags */

      if(!allTags[tag]) {

        /* [NEW] add tag to allTags object */

        allTags[tag] = 1;

      } else {

        allTags[tag]++;
      }

      /* [DONE] add generated code to html variable */

      html = html + linkHTML;

    } /* [DONE] END LOOP: for each tag */

    /* [DONE] insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;

  }  /* [DONE] END LOOP: for every article: */

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */

  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */

  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */

    allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' ' + allTags[tag] +  '</a></li> ';
    console.log(allTagsHTML);

  } /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */

  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){                             //-------------- function tagClickHandler --------------//

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */

  for(let tagLink of tagLinks){

    /* [DONE] remove class active */

    tagLink.classList.remove('active');

  } /* [DONE] END LOOP: for each active tag link */

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */

  for(let tagLinkHref of tagLinksHref){

    /* [DONE] add class active */

    tagLinkHref.classList.add('active');

  } /* [DONE] END LOOP: for each found tag link */

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){                          //-------------- function addClickListenerToTags --------------//

  /* [DONE] find all links to tags */

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* [DONE] START LOOP: for each link */

  for(let tagLink of tagLinks){

    /* [DONE] add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

  } /* [DONE] END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors(){                                  //-------------- function generateAuthors --------------//

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const wrapperAuthors = article.querySelector(optArticleAuthorSelector);

    let html = '';

    const articleAuthors = article.getAttribute('data-author');
    console.log(articleAuthors);

    const linkAuthor = '<a href="#author-' + articleAuthors +'">' + 'by ' + articleAuthors +'</a>';

    html = html + linkAuthor;

    wrapperAuthors.innerHTML = html;

  }
}

generateAuthors();

function authorClickHandler(event){                          //-------------- function authorClickHandler --------------//

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  for(let authorLink of authorLinks){

    authorLink.classList.remove('active');

  }

  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  for(let authorLinkHref of authorLinksHref){

    authorLinkHref.classList.add('active');

  }

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){                       //-------------- function addClickListenersToAuthors --------------//

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for(let authorLink of authorLinks){

    authorLink.addEventListener('click', authorClickHandler);

  }
}

addClickListenersToAuthors();
