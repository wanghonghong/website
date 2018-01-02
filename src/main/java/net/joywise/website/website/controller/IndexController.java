package net.joywise.website.website.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author whh
 * @version 1.0.0
 * @Description:
 * @Copyright: 福建卓智网络科技有限公司 (c)2016
 * @Created Date : 2017/9/11 10:26
 */
@Controller
@RequestMapping("/")
public class IndexController {

    public ModelAndView index() {
        return new ModelAndView("index");
    }
}
