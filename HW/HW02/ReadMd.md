# 유한대학교
## 학번: 202127019
## 이름: 김영민
## GIT 주소: https://github.com/yuhan27019/HW02.git
## git commitid: 61ff975496c8c97c2697c70bd2f191d01e6c1325 
<br/>

# 2주차 프로그래밍 패턴 과제


## 1. **VCS란**
Version Control System(버전 관리 시스템)의 약자. 

소프트웨어 개발에서 사용되는 중요한 도구 중 하나로, 코드의 변경 사항을 추적하고 관리하는 데 사용된다

![VCS 설명](https://github.com/yuhan27019/program/assets/162425444/bbd040c2-386f-41f2-bd9a-5ac0e5d35ecf)


 1.1 **VCS의 역할**

 
 * **버전 관리**: VCS는 코드의 변경 내역을 기록하고 각 변경 사항에 대한 버전을 관리합니다.
 
   이를 통해 팀원들은 이전 상태로의 복원, 변경 사항 간의 비교, 변경 이력 추적 등을 수행할 수 있습니다.
   
 * **협업**: 여러 명의 개발자가 동시에 작업할 때, VCS는 코드의 충돌을 방지하고 여러 사람이 동시에 작업하는 것을 가능하게 합니다.
 
   각 개발자는 독립적으로 작업한 후 변경 사항을 통합할 수 있습니다.
   
 * **백업과 복구**: 모든 코드 변경 내역이 중앙 저장소에 저장되므로, 코드 손실을 방지하고 장애 시에도 이전 상태로의 복구가 가능합니다.

 * **브랜치**: VCS는 개발자가 독립적으로 작업할 수 있는 브랜치를 제공합니다.
 
   이를 통해 새로운 기능을 개발하거나 버그를 수정할 때 기존 코드에 영향을 주지 않고 안전하게 작업할 수 있습니다.
   
   
1.2 **VCS와 DVCS의 차이**
(DVCS란 Distributed Version Control System(분산 버전 관리 시스템)의 약자입니다.)

* **중앙화 vs. 분산화**: VCS는 중앙 집중식 아키텍처를 기반으로 하며, 코드의 중앙 저장소가 있고 개발자들은 이 중앙 저장소에서 코드를 가져오고 커밋합니다.

  DVCS는 분산화된 아키텍처를 갖추고 있어서, 각 개발자는 전체 코드와 이력의 복사본을 로컬에서 가지고 있습니다.
  
* **네트워크 의존성**: VCS는 중앙 저장소와의 연결이 필수적이므로 네트워크에 연결되어 있어야 합니다.

  반면, DVCS는 로컬에서 작업을 수행할 수 있으므로 네트워크 연결이 필요하지 않습니다.
  
* **작업 흐름**: VCS에서는 변경 사항을 중앙 저장소에 커밋하고 이를 통해 변경 사항을 공유합니다.

  반면 DVCS에서는 각 개발자가 로컬에서 커밋을 수행하고 필요할 때 중앙 저장소로 푸시(push)하여 변경 사항을 공유합니다.
  
* **백업 및 복구**: VCS는 중앙 저장소에만 변경 내역이 저장되므로 중앙 저장소의 백업과 복구가 중요합니다.

  DVCS는 각 개발자가 로컬에서 변경 내역을 가지고 있기 때문에 로컬 저장소의 백업 및 복구도 중요하지만, 중앙 저장소의 장애에도 로컬에서 작업이 계속될 수 있습니다.
  

  ***
  

## 2. **GIT 사용법**

* **Git 설치**: 먼저 시스템에 Git을 설치해야 합니다. 공식 Git 웹사이트(https://git-scm.com/)에서 다운로드하고 설치할 수 있습니다.

* **저장소 초기화**: Git을 사용할 프로젝트 디렉토리로 이동한 후 다음 명령을 사용하여 Git 저장소를 초기화합니다.
<pre>
<code>
git init
</code>
</pre>
이때 생성된 brach가 master일 경우 아래의 코드를 사용해 brach의 명을 변경 가능합니다.
<pre>
<code>
git config --global init.defaultbranch main
</code>
</pre>


<pre>
<code>
Git은 지역(local), 전역(global), 시스템(system) 이렇게 3가지 범위로 설정이 가능하며 local로 설정하면 repository 설정이 가능하며, global로 설정하면 User에 관한 모든 범위의 설정이 가능해진다.
 
git config는 git 내부의 설정의 변경이 가능한 코드로 기본적으론 local 범위에서 설정이 이루어지므로 따로 --global 같은 설정범위 이름을 주어 설정 범위를 변경 가능하다.

위 코드의 경우 global 범위 중 init 시 defaultbranch(기본 브런치)의 이름을 main으로 바꾸는 코드다.
</code>
</pre>


* **유저명 및 메일 주소 설정**: git에 설정된 사용자명과 주소를 설정합니다.
<pre>
<code>
git config --global user.(name/email)
</code>
</pre>
repository의 범위에 속하는 정보들을 확인하는 코드로 자신의 파일 내 정보 확인이나 변경상황을 확인싶다면 아래의 코드를 사용하면 된다.
<pre>
<code>
git config –list
</code>
</pre>


* **깃허브에 repository 생성**

![깃허브 설명 1](https://github.com/yuhan27019/program/assets/162425444/d0c85fb3-d046-4b00-a98e-415a338f8d84)
![깃허브 설명 2](https://github.com/yuhan27019/program/assets/162425444/abbb921b-33e2-465d-89c9-905929fb4b48)
![깃허브 설명 3](https://github.com/yuhan27019/program/assets/162425444/f44897fd-7b3f-42b7-8ee7-15429f44512a)

* **파일 추가**: 프로젝트 디렉토리에서 변경된 파일을 Git이 추적하도록 추가합니다.
<pre>
<code>
git add <file1> <file2> ..
</code>
</pre>

<pre>
<code>
git status
</code>
</pre>
git status는 git에 의해 관리되는 파일들의 상태를 확인하는 코드로 git config가 변경을 담당한다면 status는 파일들이 어떤 상태인지 확인하는 코드라고 할 수 있습니다.


* **변경 사항 커밋**: 추가한 파일의 변경 사항을 커밋하여 Git 저장소에 저장합니다.
<pre>
<code>
git commit -m "커밋 메시지
</code>
</pre>

**Commit는 일종의 세이브 같은 과정으로 하나의 작업의 상태를 1~3번이라고 하면 각 상태를 commit을 통해 저장해 두었다가 언제든 원할 때 각 번호의 상태로 돌아갈 수 있습니다.**

**이때 뒤에 붙는 "-m "커밋 메시지"은 파일에 붙는 메모같은 것으로 어떤 파일을 올렸는지 구별할 때 유용합니다.**
![commit m](https://github.com/yuhan27019/program/assets/162425444/0a50de45-3955-4a3a-8f59-95852c8aa000)


* **원격 저장소 추가**: 원격 저장소를 추가하여 코드를 백업하고 다른 개발자와 협업합니다.
<pre>
<code>
git remote add origin <원격 저장소 URL>
</code>
</pre>

<pre>
<code>
remote란 리모트 저장소를 뜻하며 위의 코드는 현재의 remote 저장소에 새로운 origin이란 이름의 remote 저장소를 추가하며 그 주소를 <원격 저장소 URL>로 한다는 코드입니다.

마찬가지로 생성된 remote를 확인하고 싶은 경우 "git config –list"를 사용하면 됩니다.
</code>
</pre>


* **원격 저장소로 푸시**: 로컬 저장소의 변경 사항을 원격 저장소에 업로드합니다.
<pre>
<code>
git push -u origin main
</code>
</pre>

**Push는 최종 승인 단계로 자신의 pc의 저장소에 있는 파일들을 원격 저장소(드라이브)로 올리는 역할을 한다.**


* **변경 사항 가져오기**: 원격 저장소의 변경 사항을 로컬 저장소로 가져옵니다.
<pre>
<code>
git pull origin main
</code>
</pre>


***


## 3. **ignore란**

   Git이 추적하지 않아야 하는 파일 또는 디렉토리를 지정하는 데 사용됩니다.

   보통 컴파일된 코드, 로그 파일, IDE 프로젝트 파일 등을 .gitignore 파일에 추가하여 깃이 추적하지 않도록 합니다.

   3.1 사용법

   * **특정 파일 무시**: 특정 파일을 Git 추적에서 제외하려면 .gitignore 파일에 해당 파일 이름을 추가합니다.
<pre>
<code>
filename.gitignore
</code>
</pre>

   * **특정 확장자 무시**: 특정 확장자를 가진 모든 파일을 무시하려면 해당 확장자를 .gitignore 파일에 추가합니다.
<pre>
<code>
*.log
</code>
</pre>

   * **특정 디렉토리 무시**: 특정 디렉토리와 그 하위 파일 및 디렉토리를 모두 무시하려면 디렉토리 이름을 .gitignore 파일에 추가합니다.
<pre>
<code>
/dirname/
</code>
</pre>

   * **주석**: 주석은 '#' 문자로 시작합니다. 주석 뒤의 내용은 Git에 의해 무시됩니다.
<pre>
<code>
# 이것은 주석입니다.
</code>
</pre>

   * **패턴 일치**: 와일드카드와 패턴 매칭을 사용하여 여러 파일 또는 디렉토리를 한 번에 무시할 수 있습니다.
<pre>
<code>
*.log      # 모든 로그 파일 무시
/logs/     # logs 디렉토리와 하위 파일 및 디렉토리 무시
</code>
</pre>

   * **부정 패턴**: '!' 문자를 사용하여 특정 파일 또는 디렉토리를 제외하고 무시할 수 있습니다.
<pre>
<code>
*.log      # 모든 로그 파일 무시
!important.log  # important.log 파일은 무시하지 않음
</code>
</pre>


***


## 4. **markdown 사용법**

* **헤더(Header)**: 문서의 제목이나 섹션을 정의합니다. '#' 기호를 사용하여 헤더 레벨을 지정합니다. '#'의 개수가 적을수록 높은 수준의 제목을 나타냅니다.
<pre>
<code>
# 제목 1
## 제목 2
### 제목 3
</code>
</pre>

* **강조**: 텍스트를 굵게 나타내려면 '**' 또는 '__'로 텍스트를 감싸고, 이탤릭체로 표시하려면 '*' 또는 '_'로 텍스트를 감싸면 됩니다.
<pre>
<code>
**볼드** 혹은 __볼드__
*이탤릭* 혹은 _이탤릭_
</code>
</pre>

* **목록(List)**: 순서 있는 목록과 순서 없는 목록을 작성할 수 있습니다.
<pre>
<code>
순서 있는 목록:
1. 항목 1
2. 항목 2
3. 항목 3

순서 없는 목록:
- 항목 1
* 항목 2
- 항목 3
</code>
</pre>

* **링크(Link)**: 링크를 작성할 때는 '링크 텍스트' 형식을 사용합니다.
<pre>
<code>
[OpenAI 웹사이트](https://openai.com)
</code>
</pre>

* **이미지(Image)**: 이미지를 삽입할 때는 '![대체 텍스트](이미지 URL)' 형식을 사용합니다.
<pre>
<code>
![OpenAI 로고](https://openai.com/openai_logo.png)
</code>
</pre>

* **인용문(Blockquote)**: 인용문을 작성할 때는 '>' 기호를 사용합니다.
<pre>
<code>
> 이것은 인용문입니다.
</code>
</pre>

* **코드(Code)**: 인라인 코드나 코드 블록을 표시할 수 있습니다. 인라인 코드는 백틱('`')으로 감싸고, 코드 블록은 백틱을 세 번 연속해서 사용합니다.
<pre>
<code>
`인라인 코드`

```python
print("코드 블록")
</code>
</pre>

* **수평선(Horizontal Rule)**: 문서 내에 수평선을 추가할 수 있습니다.
<pre>
<code>
---
</code>
</pre>

* **들여쓰기**: 문장을 작성할 때 space바나 TAP 효과를 낼 수 있습니다.
<pre>
<code>
'&'nbsp;(원하는 문장)
</code>
</pre>


  ***
  # 예시

# 유한대학교 프로그래밍 패턴
## 학번: 202127019
## 이름: 김영민
 1. 목차
 2. 수없는 목차
    * 다양한 부호를 통해
    - 목차 생성가능
 3. 강조
    - 하나의 문장 중 *특정* 부분을 **강조** ~~가능하다.~~
 4. 수평선
    - 문단의 끝고 나눔을 구별할 때 사용하면 편하다.  
 ***
 5. 링크

 [네이버] https://naver.com
 [구글] https://google.com

 6. 이미지 

 [한 번쯤 가보고 싶은 곳] ![hosu](https://github.com/yuhan27019/program/assets/162425444/2820d73e-5575-4721-baa7-60cfc818a9bc)

 
 7. 들여쓰기

&nbsp;유한대학교

&nbsp;&nbsp;유한대학교

&nbsp;&nbsp;&nbsp;유한대학교

8. 코드 블럭

```코드블럭 부분```
<pre>
<code>
programing
</code>
</pre>


