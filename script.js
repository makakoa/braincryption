
$("head").prepend("<style type=\"text/css\">" + 
                    "@font-face {\n" +
                    "\tfont-family: \"myFont\";\n" + 
                      "\tsrc: local('☺'), url('myFont.otf') format('opentype');\n" + 
                    "}\n" + 
                      "\tp.myClass {\n" + 
                      "\tfont-family: myFont !important;\n" + 
                    "}\n" + 
                  "</style>");