/*
  ERROR CONTROLLER.
   SIN ESTO CUANDO INGRESAS EN LA URL "//"", ENTRA AL WHITELABEL PAGE PESE A TENER EL ERRORHANDLER.
 */

package com.example.p02.controller;

import com.example.p02.dto.ErrorDTO;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public ErrorDTO handleError() {
        return new ErrorDTO("ERROR_UNKNOWN", "Ocurrió un error inesperado...", null);
    }
}
