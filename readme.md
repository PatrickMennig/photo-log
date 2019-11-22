# Photo-Log Utility

A command line utility to speed up the process of creating photo protocols of
workshops.

## Goal

After a workshop, the moderators often have taken a large amount of pictures
of the results and the participants in action that need to be distributed
to the workshop participants.

This command line utility can be used to create pdf documents that combine
the pictures and explanatory slides of the workshop into one pdf.
Two files will be created, one containing all pictures and one only containing
the results.

An index page is also created that links to the parts of the workshop and by
clicking on an image, the viewer is taken back to the index page.

## Usage

After the workshop use a photo management software, e.g. "Photos" on a Mac
to arrange the pictures taken in the right order. Export them as jpeg images.
It is recommended to resize the images to a maximum width of 1920px and use
a reasonable quality setting (e.g. medium, quality 5, etc.) to limit the
size of individual files.
Filenames need to be alphanumerically ordered by the desired order.

Explanatory slides, e.g. in PowerPoint or Keynote, have to be exported as jpeg images too. Filenames need to be alphanumerically ordered by the desired order. Each workshop part shoul be introduced by at least one introductory slide.

Navigate to the folder where you cloned the photo-log utility into.
Now start the photo-log command line utility  and run ```create-stub <path>``` to
create a new photo-log directory on your machine at the given path. You can use the tilde operator ```~``` to shortcut your home directory (e.g. ```~/Desktop/myworkshop```).

A json file will be present at the top level of the folder. Fill out the details of
your workshop and add the parts/sessions to the respective entry in the json file. The order of the parts has to be correct.

Then run ```create-folders <path>```. This will create a directory for each workshop
session in the json file with three subdirectories: *introSlides*, *results* and *impressions*.

Add the explanatory slides images to the *introSlides* directory.
Add the results images to the *results* directory and the *impressions* to the impressions directory.

Then run ```select-template <file_Name>```  (e.g. select-template template.html).
Currently available template files are template.html, template_Courgette.html and template_JollyLodger.html. Each template has different background color and font family. User can choose any font from Google Fonts (https://fonts.google.com/).  Once you select a font from the site, you can see the link and CSS rules to specify your selected font.  Please add this specification to your template file in case you want to create a new template. 


Then run ```create-log <path>``` and wait some time. The command line utility will
create two pdf files, one containing all images and one that contains all but the impression images.

**Be happy that you just saved two hours of your life!**


## Prerequesites

You will need

- npm and node.js installed on your machine
- a wkhtmltopdf precompiled for your system (https://wkhtmltopdf.org)[https://wkhtmltopdf.org]
- a PATH entry to wkhtml
- a clone of the photo-log repository


## Styling the output

You can adjust the CSS in src/template.html to change the styling of your pdfs.



## Caveats

This utility was built with node.js which allowed us to quickly develop this solution.
Unfortunately, due to the nature of the V8 engine powering node.js, some hard limits
exist. The maximum ram size that we can allocate is set to 8GB and the length of strings
cannot exceed a hard maximum. The pictures have to be processed as base64 encoded strings
so we cannot work with too large images. This should normally not be a problem, as
you will want to limit the size of your images in the pdfs created anyway or their size
will be extremely large. We strongly recommend that you limit the size of each individual image.


## Open Issues

- Currently only works with jpeg images
- Workshop meta info is not used yet
- Status info while building the pdfs is not shown
- Deprecation warning from wkhtmltopdf is shown
- Not yet tested on Windows, Linux
- global command not working

## License

Copyright (c) 2018 Patrick Mennig

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
