package com.flyover.midwestjs.configuration

import org.springframework.cloud.netflix.zuul.EnableZuulProxy
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.filter.CharacterEncodingFilter
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@EnableZuulProxy
class WebConfiguration {
    static final String INDEX_HTML = 'index.html'

    @Bean
    WebMvcConfigurer forwardToIndex() {
        new WebMvcConfigurer() {
            @Override
            void addViewControllers(ViewControllerRegistry registry) {
                // Resolve requests to / and /app to index.html so that HTML5 routing works
                registry
                    .addRedirectViewController("/", "/app")

                registry
                    .addViewController("/app/**")
                    .setViewName(INDEX_HTML)
            }
        }
    }
}

