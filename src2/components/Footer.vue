<template>
  <footer id="footer">
    <OpenSourceSVG id="footerLogo" />
    <div class="columnMenu" id="sundayProjects">
      <h5 class="columnMenuTitle">Sunday Projects</h5>
      <div class="columnSubMenu">
        <h6 class="columnSubMenuTitle">Product Offerings</h6>
        <a class="columnSubMenuItem" :href="productLinks.kanban" target="_blank"
          >Sunday Kanban</a
        >
        <a class="columnSubMenuItem" :href="productLinks.sudoku" target="_blank"
          >Sunday Sudoku</a
        >
      </div>
    </div>

    <div class="columnMenu" id="developers">
      <h5 class="columnMenuTitle">Developers</h5>
      <a
        class="columnSubMenuItem"
        :href="developerLinks.apiDocs"
        target="_blank"
        >API Documentation</a
      >
      <a
        class="columnSubMenuItem"
        :href="developerLinks.apiGithub"
        target="_blank"
        >API GitHub Page</a
      >
      <a
        class="columnSubMenuItem"
        :href="developerLinks.clientGithub"
        target="_blank"
        >Client GitHub Page</a
      >
    </div>

    <div class="columnMenu" id="Project">
      <h5 class="columnMenuTitle">Project</h5>
      <router-link class="columnSubMenuItem" to="/about">About Us</router-link>
      <a class="columnSubMenuItem" :href="projectLinks.github" target="_blank"
        >GitHub Page</a
      >
    </div>

    <div id="copyrightSection">
      <p id="copyrightParagraph">
        &copy; 2020 Sunday Explore. All rights reserved. |
        <a :href="copyrightLinks.mitLicense" id="mitLicenseLink">MIT License</a>
      </p>
    </div>

    <div id="socialLinkSection">
      <a :href="socialLinks.linkedIn" class="socialLink" target="_blank">
        <LinkedInSVG class="socialSVG" />
      </a>
      <a :href="socialLinks.github" class="socialLink" target="_blank">
        <GitHubSVG class="socialSVG" />
      </a>
      <a :href="socialLinks.dockerHub" class="socialLink" target="_blank">
        <DockerSVG class="socialSVG" />
      </a>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Footer",
  data() {
    return {
      productLinks: {
        kanban: "https://sunday-kanbans.firebaseapp.com",
        sudoku: "https://expo.io/@rafiandria23/sunday-sudoku"
      },
      developerLinks: {
        apiDocs:
          "https://documenter.getpostman.com/view/8807216/Szf52okU?version=latest",
        apiGithub: "https://github.com/sunday-projects/fancy-todo-api",
        clientGithub: "https://github.com/sunday-projects/fancy-todo-web"
      },
      projectLinks: {
        github: "https://github.com/sunday-projects"
      },
      copyrightLinks: {
        mitLicense:
          "https://github.com/sunday-projects/fancy-todo-web/blob/master/LICENSE"
      },
      socialLinks: {
        linkedIn: "https://linkedin.com/in/rafiandria23",
        github: "https://github.com/rafiandria23",
        dockerHub: "https://hub.docker.com/u/rafiandria23"
      }
    };
  },
  components: {
    OpenSourceSVG: () => import("-!vue-svg-loader!@/assets/open-source.svg"),
    LinkedInSVG: () => import("-!vue-svg-loader!@/assets/linked-in.svg"),
    GitHubSVG: () => import("-!vue-svg-loader!@/assets/github.svg"),
    DockerSVG: () => import("-!vue-svg-loader!@/assets/docker.svg")
  }
});
</script>

<style lang="scss" scoped>
#footer {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  background-color: rgba(20, 40, 80, $fullOpacity);
  height: 300px;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  padding: 0 5vw;

  #footerLogo {
    grid-column: 1;
    height: 48px;
    width: auto;
  }

  .columnMenu {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px 0;

    .columnMenuTitle {
      color: $defaultWhite;
      font-size: 16px;
      margin: 16px 0;
      line-height: 1;
    }

    .columnSubMenu {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .columnSubMenuTitle {
      color: $defaultWhite;
      font-size: 14px;
      line-height: 1;
      margin: 6px 0;
    }

    .columnSubMenuItem {
      text-decoration: none;
      font-size: 14px;
      color: $defaultGrey;
      line-height: 1;
      margin: 6px 0;
    }

    .columnSubMenuItem:hover {
      text-decoration: underline;
    }
  }

  #sundayProjects {
    grid-column: 2;
  }

  #developers {
    grid-column: 3;
  }

  #project {
    grid-column: 4;
  }

  #copyrightSection {
    grid-row: 2;
    grid-column: 1 / span 2;
    width: 100%;
    height: 28px;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;

    #copyrightParagraph {
      display: inline-block;
      font-size: 14px;
      line-height: 1;
      color: $defaultGrey;

      #mitLicenseLink {
        text-decoration: none;
        font-size: 14px;
        line-height: 1;
        color: $defaultWhite;
      }

      #mitLicenseLink:hover {
        text-decoration: underline;
      }
    }
  }

  #socialLinkSection {
    grid-column: 3 / span 2;
    grid-row: 2;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-content: flex-end;
    align-items: flex-end;

    .socialLink {
      .socialSVG {
        width: auto;
        height: 32px;
        color: $defaultWhite;
        margin: 16px;
        transition: color 0.5s ease 0s;
      }
    }
    .socialLink:hover {
      .socialSVG {
        color: $defaultGrey;
      }
    }
  }
}
</style>
