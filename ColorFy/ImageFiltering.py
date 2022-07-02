from PIL import Image

class Filter:
    def notWhiteBackground(r, g, b):
        if r not in range(210, 256) and g not in range(210, 256)and b not in range(210, 256):
            return True
        else:
            return False
        
    def grayBackground(r, g, b):
        gRange = int(g*.6)
        bRange = int(b*.6)
        rRange = int(r*.6)
        if r in range(0, 145) and g in range(0, 145) and b in range(0, 145):
            if r in range(gRange, g+gRange) and r in range(bRange, b+bRange):
                if g in range(bRange, b+bRange) and g in range(rRange, r+rRange):
                    if b in range(gRange, g+gRange) and b in range(rRange, r+rRange):
                        return False
        else:
            return True
        
    #anything remotely close to red
    def strongRed(r, g, b):
        #if Filter.notWhiteBackground(r, g, b):
        if r > g and r > b and g < r*.8:
            return True
        else:
            return False
        
    #only encompases red
    def weakRed(r, g, b):
        if r > g and r > b and g < r*.49:
            return True
        else:
            return False
        
    #only encompases green
    def weakGreen(r, g, b):
        if not Filter.weakRed(r, g, b) and Filter.notWhiteBackground(r, g, b):
            return True
        else:
            return False
        
    #only encompases green
    def strongGreen(r, g, b):
        if Filter.notWhiteBackground(r, g, b):
            return True
        else:
            return False
        
    def isBlue(r, g, b):
        if b > r and b >= g:
            return True
        else:
            return False
class RedGreen:
    def filter(filename, resultFileName, filterType):
        image = Image.open(filename)
        image.load()
        [xs, ys] = image.size
        
        for x in range(0, xs):
            for y in range(0, ys):
                [r, g, b] = image.getpixel((x,y))
                
                #redWeak
                if filterType == "r-w":
                    if Filter.strongRed(r, g, b):
                        r = r*2
                        g = int(g/2)
                        b = int(b/2)
                    if Filter.weakGreen(r, g, b): #Dulling the green by adding more blue to it
                        b = int(g*.75)
                
                #redBlind
                if filterType == "r-b":
                    if Filter.strongRed(r, g, b):
                        g = r
                        b = int(b/2)
                    if Filter.weakGreen(r, g, b): #Dulling the green by adding more blue to i
                        b = int(g*.7)
                
                #greenWeak
                if filterType == "g-w":
                    if Filter.strongRed(r, g, b):
                        r = r*2
                        g = int(g/2)
                        b = int(b/2)
                    if Filter.weakGreen(r, g, b): #Dulling the green by adding more blue to it
                        b = int(g*.75)
                
                #greenBlind
                if filterType == "g-b":
                    if Filter.strongRed(r, g, b):
                        r = r*2
                        g = int(g/2)
                        b = int(b/2)
                    elif Filter.isBlue(r, g, b): 
                        #print((r, g, b))
                        r = b
                    else:
                        b  =  200
                       
                value = (r,g,b)
                image.putpixel((x,y),value)

        image.save(resultFileName)
 
#####################       
        
class BlueYellow:
    def filter(filename, resultFileName, filterType):
        image = Image.open(filename)
        image.load()
        [xs, ys] = image.size
        
        for x in range(0, xs):
            for y in range(0, ys):
                [r, g, b] = image.getpixel((x,y))
                if filterType == "BY-w": #Standard filter strength
                    if Filter.strongBlue(r, g, b):
                        print((r, g, b))
                        b = b*2
                        g -= int(g*.3)
                        r = int(r/2)
                value = (r,g,b)
                image.putpixel((x,y),value)

        image.save(resultFileName)